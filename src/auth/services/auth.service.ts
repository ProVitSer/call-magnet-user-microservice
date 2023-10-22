import { Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { TokenService } from './token.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUser, VerifyUser } from '../interfaces/auth.interface';
import { UserAlreadyExistsException, UserSendMailErrorException } from '@app/users/exceptions';
import { JwtPayloadDataAdapter } from '../adapters/jwt-payload-data.adapter';
import { firstValueFrom } from 'rxjs';
import { USER_CREATE_SUCCESS, USRR_ACTIVATE_SUCCESS } from '../auth.consts';
import { UsersService } from '@app/users/users.service';
import { UserVerifyProfileException } from '@app/users/exceptions/user-verify-profile.exeption';
import { UserIsActiveException } from '@app/users/exceptions/user-is-active.exeption';

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

        await this.usersService.updateByClientId(createdUser.clientId, { refreshToken: tokens.refreshToken });

        return { message: USER_CREATE_SUCCESS };
    }

    public async verifyUser(data: VerifyUser): Promise<{ message: string }> {
        const user = await this.usersService.findUser({ validationToken: data.token });
        if (!user) {
            this.log.error('verifyProfile attempt : user not found/token wrong');
            throw new RpcException(new UserVerifyProfileException());
        }

        if (user.isValide) {
            this.log.error('verifyProfile attempt : user ' + user.email + ' already activated');
            throw new RpcException(new UserIsActiveException(user.email));
        }

        if (user.validationToken == data.token) {
            this.log.debug('verifyProfile : user ' + user.email + ' activated');
            await this.usersService.updateByClientId(user.clientId, { isValide: true });
            return {
                message: USRR_ACTIVATE_SUCCESS,
            };
        }

        throw new RpcException(new UserVerifyProfileException());
    }
}
