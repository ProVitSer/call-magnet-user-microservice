import { Injectable } from '@nestjs/common';
import { NotificationModelService } from './notification-model.service';
import {
    DelNotificationData,
    GetClientNotificationsData,
    GetClientNotificationsReponse,
    GetNotificationListData,
    GetNotificationListReponse,
    MarkNotificationsIsReadData,
} from '@app/platform-types/notification/interfaces';
import { PipelineStage } from 'mongoose';
import { AddNotificationDto } from '../dto/add-notification.dto';
import { ObjectId } from 'mongodb';
import { NOTIFICATIONS_INFO_PROJ } from '../notification.constants';

@Injectable()
export class NotificationService {
    constructor(private readonly notificationModelService: NotificationModelService) {}

    public async getClientNotifications(data: GetClientNotificationsData): Promise<GetClientNotificationsReponse[]> {
        const pipeline: PipelineStage[] = [
            {
                $addFields: {
                    id: '$_id',
                },
            },
            {
                $match: { clientId: data.clientId, isDeleted: { $ne: true } },
            },
            {
                $sort: { _id: 1 },
            },
            {
                $project: {
                    _id: 0,
                    clientId: 0,
                    ...NOTIFICATIONS_INFO_PROJ,
                },
            },
            {
                $limit: Number(data.limit),
            },
        ];
        return await this.notificationModelService.getAggregateNotification(pipeline);
    }

    public async addNotification(data: AddNotificationDto) {
        return await this.notificationModelService.addNotification(data);
    }

    public async markNotificationsIsRead(data: MarkNotificationsIsReadData) {
        const criteria = {
            _id: { $in: data.ids.map((id: string) => new ObjectId(id)) },
        };

        const field = {
            $set: { isRead: true },
        };
        return await this.notificationModelService.updateNotifications(criteria, field);
    }

    public async delNotification(data: DelNotificationData) {
        return await this.notificationModelService.deleteNotification(data.notificationId);
    }

    public async getNotificationList(data: GetNotificationListData): Promise<GetNotificationListReponse> {
        const countAnswer = await this.countNotification({ clientId: data.clientId, isDeleted: { $ne: true } });

        return {
            notifications: await this.notificationList(data),
            count: countAnswer.length > 0 ? countAnswer[0].count : 0,
        };
    }

    private async countNotification(criteria: object) {
        const pipeline: PipelineStage[] = [
            {
                $match: criteria,
            },
            {
                $count: 'count',
            },
        ];
        return await this.notificationModelService.getAggregateNotification(pipeline);
    }

    private async notificationList(data: GetNotificationListData) {
        const pipeline: PipelineStage[] = [
            {
                $addFields: {
                    id: '$_id',
                },
            },
            {
                $match: { clientId: data.clientId, isDeleted: { $ne: true } },
            },
            {
                $sort: { _id: 1 },
            },
            {
                $skip: data.offset || 0,
            },
            {
                $project: {
                    _id: 0,
                    clientId: 0,
                    ...NOTIFICATIONS_INFO_PROJ,
                },
            },
            {
                $limit: data.limit,
            },
        ];
        return await this.notificationModelService.getAggregateNotification(pipeline);
    }
}
