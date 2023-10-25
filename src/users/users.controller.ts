import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';
import { FIND_USER_BY_ID_PROJ } from './users.constants';
import { FindUserByClientIdResponse } from '@app/platform-types/user/interfaces';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern({ cmd: MessagePatternCmd.findUserByClientId })
    async findUserByClientId(@Payload() clientId: string): Promise<FindUserByClientIdResponse> {
        return await this.usersService.findUser({ clientId }, FIND_USER_BY_ID_PROJ);
    }
}
