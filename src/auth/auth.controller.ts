import { Controller } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUser, ResetPassword, UpdatePassword, VerifyUser } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern({ cmd: 'register' })
    async register(@Payload() data: RegisterUser): Promise<{ message: string }> {
        return await this.authService.register(data);
    }

    @MessagePattern({ cmd: 'verify-user' })
    async verifyUser(@Payload() data: VerifyUser): Promise<{ message: string }> {
        return await this.authService.verifyUser(data);
    }

    @MessagePattern({ cmd: 'reset-password' })
    async resetPasword(@Payload() data: ResetPassword): Promise<{ message: string }> {
        return await this.authService.resetPassword(data);
    }

    @MessagePattern({ cmd: 'update-password' })
    async updatePassword(@Payload() data: UpdatePassword): Promise<{ message: string }> {
        return await this.authService.updatePassword(data);
    }
}
