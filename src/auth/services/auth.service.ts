import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { TokenService } from './token.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
    UserAlreadyExistsException,
    UserNotActiveException,
    UserNotFoundException,
    UserSendMailErrorException,
} from '@app/users/exceptions';
import { firstValueFrom } from 'rxjs';
import { CONFIRM_UPDATE_PASSWORD, PASSWORD_UPDATE_SUCCESS, USER_CREATE_SUCCESS, USRR_ACTIVATE_SUCCESS } from '../auth.constants';
import { UserVerifyProfileException } from '@app/users/exceptions/user-verify-profile.exeption';
import { UserIsActiveException } from '@app/users/exceptions/user-is-active.exeption';
import { UserNotExistsException } from '@app/users/exceptions/user-not-exist.exeption';
import { v4 as uuidv4 } from 'uuid';
import { IncorrectUserPasswordException } from '@app/users/exceptions/incorrect-user-pasword.exeption';
import { AccessDeniedException } from '../exceptions/access-denied.exeption';
import { UserDeactivateException } from '@app/users/exceptions/user-deactivate.exeption';
import { ClientProxyProvide, MessagePatternCmd } from '@app/platform-types/client-proxy/types';
import {
    BaseResponse,
    LoginResponse,
    RegisterUserResponse,
    LogoutResponse,
    RegisterUser,
    VerifyUser,
    LoginUser,
    RefreshToken,
    RefreshTokenResponse,
    VerificationCodeResponse,
    VerificationCode,
    ForgotPasswordData,
    ForgotPasswordResponse,
    ResetPassword,
} from '@app/platform-types/auth/interfaces';
import { VerifyUserResponse } from '@app/platform-types/auth/types';
import { Status } from '@app/platform-types/user/types';
import { UsersService } from '@app/users/services/users.service';
import { ArgonUtilService } from '@app/utils/argon.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(ClientProxyProvide.mail) private readonly mailService: ClientProxy,
        private readonly log: AppLoggerService,
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService,
    ) {}

    public async register(data: RegisterUser): Promise<RegisterUserResponse> {
        const user = await this.usersService.findUser({ email: data.email });

        if (user) {
            this.log.error('user ' + user.email + ' already exists in database');
            throw new RpcException(new UserAlreadyExistsException(user.email));
        }

        const createdUser = await this.usersService.addUser(data);

        const tokens = await this.tokenService.getTokens(createdUser.clientId);

        try {
            await firstValueFrom(
                this.mailService.send({ cmd: MessagePatternCmd.confEmail }, { email: data.email, token: createdUser.validationToken }),
            );
        } catch (e) {
            throw new RpcException(new UserSendMailErrorException(data.email));
        }

        await this.updateRefreshToken(createdUser.clientId, tokens.refreshToken);

        return {
            clientId: createdUser.clientId,
            email: createdUser.email,
            message: USER_CREATE_SUCCESS,
        };
    }

    public async verifyUser(data: VerifyUser): Promise<VerifyUserResponse> {
        const user = await this.usersService.findUser({ validationToken: data.token });
        if (!user) {
            this.log.error('verifyProfile attempt : user not found/token wrong');
            throw new RpcException(new UserVerifyProfileException());
        }

        if (user.isEmailVerified) {
            this.log.error('verifyProfile attempt : user ' + user.email + ' already activated');
            throw new RpcException(new UserIsActiveException(user.email));
        }

        if (user.validationToken == data.token) {
            this.log.debug('verifyProfile : user ' + user.email + ' activated');
            await this.usersService.updateByClientId(user.clientId, { isEmailVerified: true, validationToken: null });
            return {
                clientId: user.clientId,
                email: user.email,
                message: USRR_ACTIVATE_SUCCESS,
            };
        }

        throw new RpcException(new UserVerifyProfileException());
    }

    public async forgotPassword(data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
        const user = await this.usersService.findUser({ email: data.email });

        if (!user) {
            this.log.error('resetPassword attempt : user does not exist ' + data.email);
            throw new RpcException(new UserNotExistsException());
        }

        const validationToken = uuidv4();
        await this.usersService.updateByClientId(user.clientId, { validationToken });

        try {
            await firstValueFrom(
                this.mailService.send({ cmd: MessagePatternCmd.resetPasswordEmail }, { email: data.email, token: validationToken }),
            );
        } catch (e) {
            this.log.error('resetPassword attempt : Bad request' + data.email);

            throw new RpcException(new UserSendMailErrorException(data.email));
        }

        this.log.debug('resetPassword : mail sent for user ' + data.email);
        return {
            message: CONFIRM_UPDATE_PASSWORD,
        };
    }

    public async resetPassword(data: ResetPassword): Promise<BaseResponse> {
        const user = await this.usersService.findUser({ validationToken: data.verificationCode });
        if (!user) {
            this.log.error('updatePassword: user does not exist');
            throw new RpcException(new UserNotExistsException());
        }

        const hash = await ArgonUtilService.hashData(data.password);

        await this.usersService.updateByClientId(user.clientId, { password: hash, validationToken: null });

        this.log.debug('updatePassword : user ID ' + user.clientId + ' updated password');

        return {
            message: PASSWORD_UPDATE_SUCCESS,
        };
    }

    public async login(data: LoginUser): Promise<LoginResponse> {
        const user = await this.usersService.findUser({ email: data.email });

        if (!user) {
            throw new RpcException(new UserNotFoundException(data.email));
        }

        if (!user.isEmailVerified) {
            throw new RpcException(new UserNotActiveException(user.email));
        }

        if (user.status != Status.active) {
            throw new RpcException(new UserDeactivateException(user.email));
        }

        const passwordMatches = await ArgonUtilService.verify(user.password, data.password);
        if (!passwordMatches) {
            throw new RpcException(new IncorrectUserPasswordException());
        }

        const tokens = await this.tokenService.getTokens(user.clientId);

        await this.updateRefreshToken(user.clientId, tokens.refreshToken);

        await this.addLastLogin(user.clientId);

        return { ...tokens, userRoles: user.roles, menu: this.usersService.getUserMenuByRoles(user.roles) };
    }

    public async logout(clientId: string): Promise<LogoutResponse> {
        await this.usersService.updateByClientId(clientId, { refreshToken: null });
        return { result: true };
    }

    public async refreshToken(data: RefreshToken): Promise<RefreshTokenResponse> {
        const user = await this.usersService.findUser({ clientId: data.clientId });

        if (!user) {
            throw new RpcException(new AccessDeniedException());
        }

        if (!user.refreshToken) return null;

        const refreshTokenMatches = await ArgonUtilService.verify(user.refreshToken, data.refreshToken);

        if (!refreshTokenMatches) throw new AccessDeniedException();

        const token = await this.tokenService.getAccessToken(user.clientId);

        return { ...token };
    }

    private async updateRefreshToken(clientId: string, refreshToken: string): Promise<void> {
        const hashedRefreshToken = await ArgonUtilService.hashData(refreshToken);
        await this.usersService.updateByClientId(clientId, {
            refreshToken: hashedRefreshToken,
        });
    }

    private async addLastLogin(clientId: string): Promise<void> {
        await this.usersService.updateByClientId(clientId, {
            lastLogin: new Date().toISOString(),
        });
    }

    public async verifyCode(data: VerificationCode): Promise<VerificationCodeResponse> {
        const user = await this.usersService.findUser({ validationToken: data.code });
        return { isValid: !!user };
    }
}
