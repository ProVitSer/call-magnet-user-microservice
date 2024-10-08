import { NotificationAuthor } from '@app/platform-types/notification/interfaces';
import { AvatarType, NotificationType } from '@app/platform-types/notification/types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
    collection: 'notification',
    timestamps: { createdAt: 'created' },
})
export class Notification extends Document {
    @Prop({ type: String })
    clientId: string;

    @Prop({
        type: String,
        enum: NotificationType,
    })
    type: NotificationType;

    @Prop({
        type: String,
        enum: AvatarType,
    })
    avatarType: AvatarType;

    @Prop({ type: String })
    icon?: string;

    @Prop({ type: String })
    img?: string;

    @Prop({ type: String })
    smallTitle: string;

    @Prop({ type: String })
    fullTitle: string;

    @Prop({ type: String })
    smallText: string;

    @Prop({ type: String })
    html: string;

    @Prop({ type: String, default: '' })
    link: string;

    @Prop({ type: Boolean, default: false })
    isRead: boolean;

    @Prop({ type: Boolean, default: false })
    isDeleted: boolean;

    @Prop({ type: NotificationAuthor })
    author: NotificationAuthor;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
