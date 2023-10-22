import { Role } from '@app/users/interfaces/users.enum';
import { JwtPayloadDataAdapter } from '../adapters/jwt-payload-data.adapter';

export interface GetTokenData {
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    roles: Role[];
    isActive?: boolean;
}

export interface GetTokenResult {
    accessToken: string;
    refreshToken: string;
}

export type JwtPayload = JwtPayloadDataAdapter;

export interface RequestWithUser extends Request {
    user: JwtPayload;
}

export interface RegisterUser {
    firstname: string;
    lastname: string;
    email: string;
    phoneNumber: string;
    password: string;
}
