import { Menu } from '@app/platform-types/user/interfaces';
import { Role } from '@app/platform-types/user/types';

export const USER_EXIST = 'Пользователь уже существует в системе';
export const USER_NOT_EXIST = 'Пользователь не существует';
export const USER_NOT_ACTIVE = 'Пользователь не активен';
export const INCORRECT_PASSWORD = 'Введен некорректный пароль';
export const FIND_USER_BY_ID_PROJ = { _id: 1, refreshToken: 1, validationToken: 1, isEmailVerified: 1 };
export const GET_CLIENT_INFO_PROJ = { _id: 0, firstname: 1, lastname: 1, email: 1, phoneNumber: 1, company: 1, status: 1, roles: 1 };
export const UPDATE_CLIENT_SUCCESS = 'Даннйе успешно обновлены';
export const UPDATE_CLIENT_ERROR = 'Ошибка обновления данных';
export const PASSWORD_UPDATE_SUCCESS = 'Пароль успешно обновлен';

export const BASE_ROLE_MENU: Menu[] = [
    {
        name: 'Рабочий стол',
        path: '/sm/dashboard',
        icon: 'ft-monitor',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
    {
        name: 'Аналитика',
        path: '/sm/analitic',
        icon: 'ft-bar-chart-2',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
];

export const SM_MENU: Menu[] = [
    {
        name: 'CRM',
        path: '',
        icon: 'ft-layout',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    name: 'Настройки',
                    path: '/sm/crm/settings',
                    icon: 'ft-settings',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
            ],
        },
    },
];

export const PRO_MENU: Menu[] = [];

export const STATIC_MENU_BY_ROLE: { [role in Role]: Menu[] } = {
    [Role.SM]: SM_MENU,
    [Role.PRO]: PRO_MENU,
};

// export const ROUTES: RouteInfo[] = [

//     { path: '/sm/api', title: '3CX API', icon: 'ft-repeat', class: '', badge: 'Новое', badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1', isExternalLink: false, submenu: [] },
//     { path: '', title: 'Автообзвон', icon: 'ft-phone-outgoing', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
//       { path: '/sm/auto-dial/create', title: 'Создать', icon: 'icon-note', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/auto-dial/tasks', title: 'Задания на обзвон', icon: 'icon-shuffle', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/auto-dial/reports', title: 'Отчеты', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/auto-dial/settings', title: 'Настройки', icon: 'ft-settings', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//     ] },
//     { path: '', title: 'SMS', icon: 'icon-speech', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
//       { path: '/sm/sms/send', title: 'Отправка', icon: 'icon-share-alt', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/sms/mass-sending', title: 'Массовая рассылка', icon: 'icon-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/sms/no-answer-call-sending', title: 'Неотвеченные вызовы', icon: 'icon-call-end', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/sms/statistic', title: 'Статистика', icon: 'ft-align-left', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/sms/settings', title: 'Настройки', icon: 'ft-settings', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//     ] },
//     { path: '', title: 'Telegram', icon: 'icon-paper-plane', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
//       { path: '/sm/telegram/no-answer-call', title: 'Неотвеченные вызовы', icon: 'icon-call-end', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
//       { path: '/sm/telegram/call', title: 'Звонки', icon: 'icon-call-out', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },

//     ] },
//     { path: 'https://icep.omnidesk.ru/', title: 'Поддержка', icon: 'ft-life-buoy', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
//   ];
