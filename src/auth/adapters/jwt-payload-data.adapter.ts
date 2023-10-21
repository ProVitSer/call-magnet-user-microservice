import { Role } from '@app/users/interfaces/users.enum';
import { User } from '@app/users/schemas/users.schema';

export class JwtPayloadDataAdapter {
    public clientId: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public roles: Role[];
    public profileStatus: boolean;
    constructor(public user: User) {
        this.clientId = user.clientId;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.roles = user.roles;
        this.profileStatus = user.isActive;
    }
}
