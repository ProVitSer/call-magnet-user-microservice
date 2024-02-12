import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, AggregateOptions, ProjectionType } from 'mongoose';
import { Notification } from '../schemas/notification.schema';
import { AddNotificationData } from '@app/platform-types/notification/interfaces';
import { AppLoggerService } from '@app/app-logger/app-logger.service';
import { NotificationModelDataAdapter } from '../adapters/notification-model-data.adapter';
import { ObjectId } from 'mongodb';

@Injectable()
export class NotificationModelService {
    constructor(@InjectModel(Notification.name) readonly notificationModel: Model<Notification>, private readonly log: AppLoggerService) {}

    public async getNotificationById(id: string, projection?: ProjectionType<Notification>) {
        return await this.notificationModel.findById(id, projection, { isDeleted: false });
    }

    public async getAggregateNotification(pipeline: PipelineStage[], options?: AggregateOptions) {
        return await this.notificationModel.aggregate(pipeline, options);
    }

    public async updateNotificationById(id: string, fields: object) {
        return await this.notificationModel.findOneAndUpdate({ _id: id }, { $set: { ...fields } });
    }

    public async updateNotifications(criteria: object, fields: object) {
        return await this.notificationModel.updateMany(criteria, fields);
    }

    public async addNotification(data: AddNotificationData) {
        const createdNotification = new this.notificationModel(new NotificationModelDataAdapter(data));

        this.log.log('new notification ' + data + ' created');

        return await createdNotification.save();
    }

    public async deleteNotification(id: string) {
        return await this.notificationModel.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isDeleted: true } });
    }
}
