import { AvatarType, NotificationType } from '@app/platform-types/notification/types';

export const NOTIFICATIONS_INFO_PROJ = { __v: 0, updatedAt: 0 };
export const DEFAULT_WELCOME_NOTIFICATION = {
    type: NotificationType.alert,
    avatarType: AvatarType.name,
    smallTitle: 'Call Magnet',
    fullTitle: 'Спасибо большое за регистрацию',
    smallText: 'Спасибо большое за регистрацию на нашей платформе',
    html: `<div class='col-xl-6 col-lg-6 col-md-12'><div class='card overflow-hidden'>
    <div class='card-content'>
    <img class='card-img-top img-fluid' src='assets/img/photos/06.jpg' alt='Card image cap'>
    <div class='card-body'>
    <h4 class='card-title'>FAQ</h4>
    <p class='card-text'></p>
    <button type='button' class='btn btn-warning'>Перейти</button>
    </div>
    </div>
    </div>
    </div>`,
    author: {
        firstName: 'Call',
        lastName: 'Magnet',
    },
};
