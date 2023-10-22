import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { TokenService } from './token.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RegisterUser } from '../interfaces/auth.interface';
import { UserAlreadyExistsException, UserSendMailErrorException } from '@app/users/exceptions';
import { JwtPayloadDataAdapter } from '../adapters/jwt-payload-data.adapter';
import { firstValueFrom } from 'rxjs';
import { USER_CREATE_SUCCESS } from '../auth.consts';
import { UsersService } from '@app/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject('MAIL_SERVICE') private readonly mailService: ClientProxy,
        private readonly log: AppLoggerService,
        private readonly tokenService: TokenService,
        private readonly usersService: UsersService,
    ) {}

    public async register(data: RegisterUser): Promise<{ message: string }> {
        const user = await this.usersService.findByUserByEmail(data.email);

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
}
