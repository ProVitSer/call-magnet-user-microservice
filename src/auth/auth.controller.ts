import { Controller } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @MessagePattern({ cmd: 'validate-token' })
    async validateToken(@Payload() data: any): Promise<any> {
        return this.authService.validate(data);
    }
}
