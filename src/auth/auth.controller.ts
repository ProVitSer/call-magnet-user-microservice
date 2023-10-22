import { Controller } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUser, VerifyUser } from './interfaces/auth.interface';

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
}
