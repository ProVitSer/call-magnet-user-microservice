import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokensResult } from '../interfaces/auth.interface';
import { DataObject } from '@app/platform-types/common/interfaces';

@Injectable()
export class TokenService {
    constructor(private jwtService: JwtService) {}

    public async getTokens(clientId: string): Promise<GetTokensResult> {
        return {
            ...(await this.getAccessToken(clientId)),
            refreshToken: await this.getToken({ sub: clientId }, process.env.JWT_RT_SECRET, process.env.JWT_RT_EXP),
        };
    }

    public async getAccessToken(clientId: string) {
        return {
            accessToken: await this.getToken({ sub: clientId }, process.env.JWT_AT_SECRET, process.env.JWT_AT_EXP),
        };
    }

    public async getToken(data: DataObject, secret: string, expiresIn: string): Promise<string> {
        return await this.jwtService.signAsync({ ...data }, { secret, expiresIn });
    }

    public async verify(token: string) {
        return this.jwtService.verify(token);
    }
}
