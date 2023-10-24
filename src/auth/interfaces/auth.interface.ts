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
    accessTokenExpires: number;
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

export interface VerifyUser {
    token: string;
}

export interface ResetPassword {
    email: string;
}

export interface UpdatePassword {
    token: string;
    password: string;
}

export interface LoginUserRequest {
    email: string;
    password?: string;
}

export type LoginUserResponse = GetTokenResult;

export interface RefreshToken {
    clientId: string;
    refreshToken: string;
}
