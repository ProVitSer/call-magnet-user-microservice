import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: 'find-user-by-clientId' })
    async refreshToken(@Payload() clientId: string): Promise<any> {
        return await this.usersService.findUser({ clientId }, { _id: 1 });
    }
}
