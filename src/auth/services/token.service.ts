import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokensResult } from '../interfaces/auth.interface';
import { JwtPayloadDataAdapter } from '../adapters/jwt-payload-data.adapter';
import * as moment from 'moment';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    public async getTokens(data: JwtPayloadDataAdapter): Promise<GetTokensResult> {
        return {
            accessToken: await this.getToken(data.clientId, process.env.JWT_AT_SECRET, process.env.JWT_AT_EXP),
            refreshToken: await this.getToken(data.clientId, process.env.JWT_RT_SECRET, process.env.JWT_RT_EXP),
            accessTokenExpires: moment().add(600, 'minutes').unix(),
        };
    }

    public async getToken(sub: string, secret: string, expiresIn: string): Promise<string> {
        return await this.jwtService.signAsync({ sub }, { secret, expiresIn });
    }

    public async verify(token: string) {
        return this.jwtService.verify(token);
    }
}
