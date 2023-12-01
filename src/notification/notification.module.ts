import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notification } from './schemas/notification.schema';
import { NotificationService } from './services/notification.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])],
    controllers: [NotificationController],
    providers: [NotificationService],
    exports: [NotificationService],
})
export class NotificationModule {}
