import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/users.schema';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { AddUser } from '../interfaces/users.interface';
import { UserModelAdapter } from '../adapters/user-model.adapter';
import {
    FindUserByClientIdResponse,
    GetClientInfoResponse,
    Menu,
    UpdateClientInfoData,
    UpdateClientInfoResponse,
} from '@app/platform-types/user/interfaces';
import { Role } from '@app/platform-types/user/types';
import {
    BASE_ROLE_MENU,
    STATIC_MENU_BY_ROLE,
    FIND_USER_BY_ID_PROJ,
    GET_CLIENT_INFO_PROJ,
    UPDATE_CLIENT_SUCCESS,
    UPDATE_CLIENT_ERROR,
} from '../users.constants';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) readonly userModel: Model<User>, private readonly log: AppLoggerService) {}

    public async addUser(data: AddUser): Promise<User> {
        const createdUser = new this.userModel((await UserModelAdapter.factory(data)).userData);

        this.log.log('new user ' + data.email + ' created');

        return await createdUser.save();
    }

    public async updateByClientId(clientId: string, fields: object) {
        this.log.log('update' + clientId + 'info ' + fields);

        return await this.userModel.findOneAndUpdate({ clientId }, { $set: { ...fields } });
    }

    public getUserMenuByRoles(roles: Role[]): Menu[] {
        const menu: Menu[] = [...BASE_ROLE_MENU];
        for (const role of roles) {
            menu.push(...STATIC_MENU_BY_ROLE[role]);
        }

        return menu;
    }

    public async getClientInfo(clientId: string): Promise<GetClientInfoResponse> {
        return await this.findUser({ clientId }, GET_CLIENT_INFO_PROJ);
    }

    public async findUserByClientId(clientId: string): Promise<FindUserByClientIdResponse> {
        return await this.findUser({ clientId }, FIND_USER_BY_ID_PROJ);
    }

    public async findUser(filter: object, projection?: { [key: string]: number }): Promise<User> {
        const user: User = await this.userModel.findOne({ ...filter }, projection).exec();
        return user;
    }

    public async updateClientInfo(data: UpdateClientInfoData): Promise<UpdateClientInfoResponse> {
        try {
            const { clientId, ...clientInfo } = data;

            await this.updateByClientId(clientId, clientInfo);

            return { result: true, message: UPDATE_CLIENT_SUCCESS };
        } catch (e) {
            return { result: false, message: UPDATE_CLIENT_ERROR };
        }
    }
}
