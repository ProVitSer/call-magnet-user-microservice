import { AddNotificationData, NotificationAuthor } from '@app/platform-types/notification/interfaces';
import { AvatarType, NotificationType } from '@app/platform-types/notification/types';

export class NotificationModelDataAdapter {
    public clientId: string;
    public type: NotificationType;
    public avatarType: AvatarType;
    public icon: string;
    public img: string;
    public title: string;
    public smalText: string;
    public html: string;
    public link: string;
    public author: NotificationAuthor;
    constructor(data: AddNotificationData) {
        this.clientId = data.clientId;
        this.type = data?.type || NotificationType.alert;
        this.avatarType = data?.avatarType || AvatarType.name;
        this.icon = data?.icon;
        this.img = data?.img;
        this.title = data.title;
        this.smalText = data.smalText;
        this.html = data.html;
        this.link = data?.link || '';
        this.author = data?.author || {
            firstName: 'Call',
            lastName: 'Magnet',
        };
    }
}
