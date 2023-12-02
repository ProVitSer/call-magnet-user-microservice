import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MessagePatternCmd } from '@app/platform-types/client-proxy/types';
import { NotificationService } from './services/notification.service';
import {
    GetClientNotificationsData,
    GetClientNotificationsReponse,
    MarkNotificationsIsReadData,
} from '@app/platform-types/notification/interfaces';
import { Request, Response } from 'express';
import { AddNotificationDto } from './dto/add-notification.dto';

@Controller('notification')
export class NotificationController {
    constructor(private readonly notificationService: NotificationService) {}

    @MessagePattern({ cmd: MessagePatternCmd.getClientNotifications })
    async findUserByClientId(@Payload() data: GetClientNotificationsData): Promise<GetClientNotificationsReponse[]> {
        return await this.notificationService.getClientNotifications(data);
    }

    @Post('add')
    async addNotification(@Req() req: Request, @Res() res: Response, @Body() body: AddNotificationDto) {
        const result = await this.notificationService.addNotification(body);
        res.status(200).json(result);
    }

    @MessagePattern({ cmd: MessagePatternCmd.markNotificationsIsRead })
    async markNotificationsIsRead(@Payload() data: MarkNotificationsIsReadData) {
        return await this.notificationService.markNotificationsIsRead(data);
    }
}
