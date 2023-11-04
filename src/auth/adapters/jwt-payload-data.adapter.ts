// import { Menu } from '@app/platform-types/user/interfaces';
// import { Role, Status } from '@app/platform-types/user/types';
// import { User } from '@app/users/schemas/users.schema';
// import { STATIC_MENU_BY_ROLE } from '@app/users/users.constants';

// export class JwtPayloadDataAdapter {
//     public clientId: string;
//     public firstname: string;
//     public lastname: string;
//     public email: string;
//     public role: Role;
//     public profileStatus: Status;
//     public menu: Menu[];
//     constructor(public user: User) {
//         this.clientId = user.clientId;
//         this.firstname = user.firstname;
//         this.lastname = user.lastname;
//         this.email = user.email;
//         this.role = user.role;
//         this.profileStatus = user.status;
//         this.menu = STATIC_MENU_BY_ROLE[user.role];
//     }
// }
