import { TokenService } from '@app/auth/services/token.service';
import { Inject, Injectable } from '@nestjs/common';
import { AddUser, UserDataAdapter } from '../interfaces/users.interface';
import { v4 as uuidv4 } from 'uuid';
import * as argon2 from 'argon2';

@Injectable()
export class UserModelAdapter {
    @Inject(TokenService)
    static readonly tokenService: TokenService;
    constructor(public userData: UserDataAdapter) {}

    static async factory(createUser: AddUser): Promise<UserModelAdapter> {
        const clientId = uuidv4();
        const password = await argon2.hash(createUser.password);
        const validationToken = uuidv4();
        delete createUser.password;
        return new UserModelAdapter({ ...createUser, validationToken, clientId, password });
    }
}
