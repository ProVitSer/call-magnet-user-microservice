import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokenResult } from '../interfaces/auth.interface';
import { JwtPayloadDataAdapter } from '../adapters/jwt-payload-data.adapter';
import * as moment from 'moment';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    public async getTokens(data: JwtPayloadDataAdapter): Promise<GetTokenResult> {
        return {
            accessToken: await this.getToken(data.clientId, process.env.JWT_AT_SECRET, process.env.JWT_AT_EXP),
            refreshToken: await this.getToken(data.clientId, process.env.JWT_RT_SECRET, process.env.JWT_RT_EXP),
            accessTokenExpires: moment().add(600, 'minutes').unix(),
        };
    }

    public async getToken(sub: string, secret: string, expiresIn: string) {
        return await this.jwtService.signAsync({ sub }, { secret, expiresIn });
    }

    public async verify(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}
