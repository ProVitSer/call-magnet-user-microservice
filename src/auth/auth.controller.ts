import { Controller } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';
import {
    BaseResponse,
    LoginUser,
    LogoutResponse,
    RefreshToken,
    RegisterUser,
    RegisterUserResponse,
    ResetPassword,
    ResetPasswordResponse,
    TokensResponse,
    UpdatePassword,
    VerifyUser,
} from '@app/platform-types/auth/interfaces';
import { VerifyUserResponse } from '@app/platform-types/auth/types';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern({ cmd: MessagePatternCmd.register })
    async register(@Payload() data: RegisterUser): Promise<RegisterUserResponse> {
        return await this.authService.register(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.verifyUser })
    async verifyUser(@Payload() data: VerifyUser): Promise<VerifyUserResponse> {
        return await this.authService.verifyUser(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.resetPassword })
    async resetPasword(@Payload() data: ResetPassword): Promise<ResetPasswordResponse> {
        return await this.authService.resetPassword(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.updatePassword })
    async updatePassword(@Payload() data: UpdatePassword): Promise<BaseResponse> {
        return await this.authService.updatePassword(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.login })
    async login(@Payload() data: LoginUser): Promise<TokensResponse> {
        return await this.authService.login(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.logout })
    async loguot(@Payload() clientId: string): Promise<LogoutResponse> {
        return await this.authService.logout(clientId);
    }

    @MessagePattern({ cmd: MessagePatternCmd.refreshToken })
    async refreshToken(@Payload() data: RefreshToken): Promise<TokensResponse> {
        return await this.authService.refreshToken(data);
    }
}
