import { User } from '@app/users/schemas/users.schema';
import { UsersService } from '@app/users/services/users.service';
import { GetTokensResult } from '../interfaces/auth.interface';
import { Menu } from '@app/platform-types/user/interfaces';
import { LoginResponse } from '@app/platform-types/auth/interfaces';
import { Role } from '@app/platform-types/user/types';

export class LoginResponseDataAdapter implements LoginResponse {
    public accessToken: string;
    public refreshToken: string;
    public firstname: string;
    public lastname: string;
    public company: string;
    public menu: Menu[];
    public userRoles: Role[];
    constructor(user: User, tokens: GetTokensResult, usersService: UsersService) {
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.company = user.company;
        this.menu = usersService.getUserMenuByRoles(user.roles);
        this.userRoles = user.roles;
    }
}
