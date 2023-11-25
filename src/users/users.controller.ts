import { Controller } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';
import { FindUserByClientIdResponse, GetClientInfoResponse } from '@app/platform-types/user/interfaces';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: MessagePatternCmd.findUserByClientId })
    async findUserByClientId(@Payload() clientId: string): Promise<FindUserByClientIdResponse> {
        return await this.usersService.findUserByClientId(clientId);
    }

    @MessagePattern({ cmd: MessagePatternCmd.getClientInfo })
    async getClientInfo(@Payload() clientId: string): Promise<GetClientInfoResponse> {
        return await this.usersService.getClientInfo(clientId);
    }
}
