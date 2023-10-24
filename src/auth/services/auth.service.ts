import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { TokenService } from './token.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
    LoginUserRequest,
    LoginUserResponse,
    RefreshToken,
    RegisterUser,
    ResetPassword,
    UpdatePassword,
    VerifyUser,
} from '../interfaces/auth.interface';
import {
    UserAlreadyExistsException,
    UserNotActiveException,
    UserNotFoundException,
    UserSendMailErrorException,
} from '@app/users/exceptions';
import { JwtPayloadDataAdapter } from '../adapters/jwt-payload-data.adapter';
import { firstValueFrom } from 'rxjs';
import { CONFIRM_UPDATE_PASSWORD, PASSWORD_UPDATE_SUCCESS, USER_CREATE_SUCCESS, USRR_ACTIVATE_SUCCESS } from '../auth.consts';
import { UsersService } from '@app/users/users.service';
import { UserVerifyProfileException } from '@app/users/exceptions/user-verify-profile.exeption';
import { UserIsActiveException } from '@app/users/exceptions/user-is-active.exeption';
import * as argon2 from 'argon2';
import { UserNotExistsException } from '@app/users/exceptions/user-not-exist.exeption';
import { v4 as uuidv4 } from 'uuid';
import { IncorrectUserPasswordException } from '@app/users/exceptions/incorrect-user-pasword.exeption';
import { AccessDeniedException } from '../exceptions/access-denied.exeption';
import { Status } from '@app/users/interfaces/users.enum';
import { UserDeactivateException } from '@app/users/exceptions/user-deactivate.exeption';

@Injectable()
export class AuthService {
    constructor(
        @Inject('MAIL_SERVICE') private readonly mailService: ClientProxy,
        private readonly log: AppLoggerService,
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService,
    ) {}

    public async register(data: RegisterUser): Promise<{ message: string }> {
        const user = await this.usersService.findUser({ email: data.email });

        if (user) {
            this.log.error('user ' + user.email + ' already exists in database');
            throw new RpcException(new UserAlreadyExistsException(user.email));
        }

        const createdUser = await this.usersService.addUser(data);

        const tokens = await this.tokenService.getTokens(new JwtPayloadDataAdapter(createdUser));

        try {
            await firstValueFrom(
                this.mailService.send({ cmd: 'confirmation-email' }, { email: data.email, token: createdUser.validationToken }),
            );
        } catch (e) {
            throw new RpcException(new UserSendMailErrorException(data.email));
        }

        await this.updateRefreshToken(createdUser.clientId, tokens.refreshToken);

        return { message: USER_CREATE_SUCCESS };
    }

    public async verifyUser(data: VerifyUser): Promise<{ message: string }> {
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
            await this.usersService.updateByClientId(user.clientId, { isEmailVerified: true });
            return {
                message: USRR_ACTIVATE_SUCCESS,
            };
        }

        throw new RpcException(new UserVerifyProfileException());
    }

    public async resetPassword(data: ResetPassword): Promise<{ message: string }> {
        const user = await this.usersService.findUser({ email: data.email });

        if (!user) {
            this.log.error('resetPassword attempt : user does not exist ' + data.email);
            throw new RpcException(new UserNotExistsException());
        }

        const validationToken = uuidv4();
        await this.usersService.updateByClientId(user.clientId, { validationToken });

        try {
            await firstValueFrom(this.mailService.send({ cmd: 'reset-password-email' }, { email: data.email, token: validationToken }));
        } catch (e) {
            this.log.error('resetPassword attempt : Bad request' + data.email);

            throw new RpcException(new UserSendMailErrorException(data.email));
        }

        this.log.debug('resetPassword : mail sent for user ' + data.email);
        return {
            message: CONFIRM_UPDATE_PASSWORD,
        };
    }

    public async updatePassword(data: UpdatePassword): Promise<{ message: string }> {
        const user = await this.usersService.findUser({ validationToken: data.token });
        if (!user) {
            this.log.error('updatePassword: user does not exist');
            throw new RpcException(new UserNotExistsException());
        }

        const hash = await this.hashData(data.password);

        await this.usersService.updateByClientId(user.clientId, { password: hash });

        this.log.debug('updatePassword : user ID ' + user._id + ' updated password');

        return {
            message: PASSWORD_UPDATE_SUCCESS,
        };
    }

    public async login(data: LoginUserRequest): Promise<LoginUserResponse> {
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

        const passwordMatches = await argon2.verify(user.password, data.password);
        if (!passwordMatches) {
            throw new RpcException(new IncorrectUserPasswordException());
        }

        const tokens = await this.tokenService.getTokens(new JwtPayloadDataAdapter(user));

        await this.updateRefreshToken(user.clientId, tokens.refreshToken);

        return tokens;
    }

    public async logout(clientId: string): Promise<any> {
        await this.usersService.updateByClientId(clientId, { refreshToken: null });
        return 'User password was updated !';
    }

    public async refreshToken(data: RefreshToken) {
        const user = await this.usersService.findUser({ clientId: data.clientId });

        if (!user) {
            throw new RpcException(new AccessDeniedException());
        }

        if (!user.refreshToken) return null;

        const refreshTokenMatches = await argon2.verify(user.refreshToken, data.refreshToken);

        if (!refreshTokenMatches) throw new AccessDeniedException();

        const tokens = await this.tokenService.getTokens(new JwtPayloadDataAdapter(user));

        await this.updateRefreshToken(data.clientId, tokens.refreshToken);

        return tokens;
    }

    private async updateRefreshToken(clientId: string, refreshToken: string) {
        const hashedRefreshToken = await this.hashData(refreshToken);
        await this.usersService.updateByClientId(clientId, {
            refreshToken: hashedRefreshToken,
        });
    }

    private hashData(data: string) {
        return argon2.hash(data);
    }
}
