import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { RegisterUser } from './interfaces/users.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'register' })
    async register(@Payload() data: RegisterUser): Promise<{ message: string }> {
        return await this.usersService.register(data);
    }
}
