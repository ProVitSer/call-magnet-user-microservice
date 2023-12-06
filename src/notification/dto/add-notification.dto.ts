import { NotificationAuthor } from '@app/platform-types/notification/interfaces';
import { AvatarType, NotificationType } from '@app/platform-types/notification/types';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddNotificationDto {
    @IsNotEmpty()
    @IsString()
    clientId: string;

    @IsOptional()
    @IsEnum(NotificationType)
    type: NotificationType;

    @IsOptional()
    @IsEnum(AvatarType)
    avatarType: AvatarType;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsOptional()
    @IsString()
    img?: string;

    @IsNotEmpty()
    @IsString()
    smallTitle: string;

    @IsNotEmpty()
    @IsString()
    fullTitle: string;

    @IsNotEmpty()
    @IsString()
    smallText: string;

    @IsNotEmpty()
    @IsString()
    html: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsOptional()
    author?: NotificationAuthor;
}
