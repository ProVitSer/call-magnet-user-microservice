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
    LoginResponse,
    ResetPassword,
    VerifyUser,
    RefreshTokenResponse,
    VerificationCode,
    VerificationCodeResponse,
    ForgotPasswordData,
    ForgotPasswordResponse,
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

    @MessagePattern({ cmd: MessagePatternCmd.forgotPassword })
    async forgotPassword(@Payload() data: ForgotPasswordData): Promise<ForgotPasswordResponse> {
        return await this.authService.forgotPassword(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.resetPassword })
    async resetPassword(@Payload() data: ResetPassword): Promise<BaseResponse> {
        return await this.authService.resetPassword(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.login })
    async login(@Payload() data: LoginUser): Promise<LoginResponse> {
        return await this.authService.login(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.logout })
    async loguot(@Payload() clientId: string): Promise<LogoutResponse> {
        return await this.authService.logout(clientId);
    }

    @MessagePattern({ cmd: MessagePatternCmd.refreshToken })
    async refreshToken(@Payload() data: RefreshToken): Promise<RefreshTokenResponse> {
        return await this.authService.refreshToken(data);
    }

    @MessagePattern({ cmd: MessagePatternCmd.verifyCode })
    async verifyCode(@Payload() data: VerificationCode): Promise<VerificationCodeResponse> {
        return await this.authService.verifyCode(data);
    }
}
