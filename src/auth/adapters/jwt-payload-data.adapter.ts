import { Role, Status } from '@app/platform-types/user/types';
import { User } from '@app/users/schemas/users.schema';

export class JwtPayloadDataAdapter {
    public clientId: string;
    public firstname: string;
    public lastname: string;
    public email: string;
    public role: Role;
    public profileStatus: Status;
    constructor(public user: User) {
        this.clientId = user.clientId;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.role = user.role;
        this.profileStatus = user.status;
    }
}
