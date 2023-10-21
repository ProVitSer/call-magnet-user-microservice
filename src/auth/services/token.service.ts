import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { GetTokenResult } from '../interfaces/auth.interface';
import { JwtPayloadDataAdapter } from '../adapters/jwt-payload-data.adapter';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    public async getTokens(data: JwtPayloadDataAdapter): Promise<GetTokenResult> {
        return {
            accessToken: await this.getToken(data, process.env.JWT_SECRET, process.env.JWT_EXPIRATION_TIME),
            refreshToken: await this.getToken(data, process.env.REFRESH_TOKEN_SECRET, process.env.REFRESH_TOKEN_EXPIRATION_TIME),
        };
    }

    public async getToken(data: JwtPayloadDataAdapter, secret: string, expiresIn: string) {
        delete data.user;
        return await this.jwtService.signAsync({ ...data }, { secret, expiresIn });
    }

    public async verifyPassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await argon2.verify(plainTextPassword, hashedPassword);
    }

    public async verify(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}
