import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { UserAlreadyExistsException, UserSendMailErrorException } from './exceptions';
import { RegisterUser } from './interfaces/users.interface';
import { USER_CREATE_SUCCESS } from './users.consts';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserModelAdapter } from './adapters/user-model.adapter';
import { TokenService } from '@app/auth/services/token.service';
import { JwtPayloadDataAdapter } from '@app/auth/adapters/jwt-payload-data.adapter';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) readonly userModel: Model<User>,
        private readonly log: AppLoggerService,
        private readonly tokenService: TokenService,
        @Inject('MAIL_SERVICE') private readonly mailService: ClientProxy,
    ) {}

    public async register(data: RegisterUser): Promise<{ message: string }> {
        const user = await this.findByUserByEmail(data.email);

        if (user) {
            this.log.error('user ' + user.email + ' already exists in database');
            throw new RpcException(new UserAlreadyExistsException(`Профиль пользователя с email: ${user.email} зарегистрирован`));
        }

        const createdUser = new this.userModel((await UserModelAdapter.factory(data)).userData);

        this.log.log('new user ' + data.email + ' created');

        const createUser = await createdUser.save();

        const tokens = await this.tokenService.getTokens(new JwtPayloadDataAdapter(createUser));

        try {
            await firstValueFrom(
                this.mailService.send({ cmd: 'confirmation-email' }, { email: data.email, token: createUser.validationToken }),
            );
        } catch (e) {
            throw new RpcException(new UserSendMailErrorException(data.email));
        }

        await this.userModel.findOneAndUpdate({ _id: createUser._id }, { $set: { refreshToken: tokens.refreshToken } });

        return { message: USER_CREATE_SUCCESS };
    }

    private async findByUserByEmail(email: string): Promise<User> {
        const user: User = await this.userModel.findOne({ email }).exec();
        return user;
    }
}
