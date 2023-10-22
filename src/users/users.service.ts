import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { AddUser } from './interfaces/users.interface';
import { UserModelAdapter } from './adapters/user-model.adapter';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) readonly userModel: Model<User>, private readonly log: AppLoggerService) {}

    public async findByUserByEmail(email: string): Promise<User> {
        const user: User = await this.userModel.findOne({ email }).exec();
        return user;
    }

    public async addUser(data: AddUser): Promise<User> {
        const createdUser = new this.userModel((await UserModelAdapter.factory(data)).userData);

        this.log.log('new user ' + data.email + ' created');

        return await createdUser.save();
    }
    public async updateByClientId(clientId: string, fields: object) {
        return await this.userModel.findOneAndUpdate({ clientId }, { $set: { ...fields } });
    }
}
