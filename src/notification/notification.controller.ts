import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';

@Controller('notification')
export class NotificationController {
    constructor() {}

    @MessagePattern({ cmd: MessagePatternCmd.findUserByClientId })
    async findUserByClientId(@Payload() clientId: string): Promise<void> {}
}
