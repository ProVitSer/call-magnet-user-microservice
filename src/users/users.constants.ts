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
        code: 1,
        name: 'Рабочий стол',
        path: '/sm/dashboard',
        icon: 'ft-monitor',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
    {
        code: 8,
        name: 'FAQ',
        path: '/sm/faq',
        icon: 'icon-question',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
    {
        code: 9,
        name: 'Поддержка',
        path: 'https://icep.omnidesk.ru/',
        icon: 'ft-life-buoy',
        badge: '',
        badgeClass: '',
        externalLink: true,
        group: { lines: [] },
    },
];

export const ANALITIC_MENU: Menu[] = [
    {
        code: 2,
        path: '/sm/analitic',
        name: 'Аналитика',
        icon: 'ft-bar-chart-2',
        //badge: 'Новое',
        badge: '',
        // badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        badgeClass: '',
        externalLink: false,
        group: { lines: [] },
    },
];

export const CRM_MENU: Menu[] = [
    {
        code: 3,
        name: 'CRM',
        path: '',
        icon: 'ft-layout',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
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

export const API_MENU: Menu[] = [
    {
        code: 4,
        path: '/sm/api',
        name: '3CX API',
        icon: 'ft-repeat',
        badge: 'Новое',
        badgeClass: 'badge badge-pill badge-primary float-right mr-1 mt-1',
        externalLink: false,
        group: { lines: [] },
    },
];

export const AUTO_DIAL_MENU: Menu[] = [
    {
        code: 5,
        name: 'Автообзвон',
        path: '',
        icon: 'ft-phone-outgoing',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Создать',
                    path: '/sm/auto-dial/create',
                    icon: 'icon-note',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Задания на обзвон',
                    path: '/sm/auto-dial/tasks',
                    icon: 'icon-shuffle',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 3,
                    name: 'Отчеты',
                    path: '/sm/auto-dial/reports',
                    icon: 'ft-file-text',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 4,
                    name: 'Настройки',
                    path: '/sm/auto-dial/settings',
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

export const KPI_MENU: Menu[] = [
    {
        code: 6,
        name: 'KPI колл-центра',
        path: '',
        icon: 'ft-users',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Статистика',
                    path: '/sm/kpi/statistic',
                    icon: 'ft-align-left',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Настройки',
                    path: '/sm/kpi/settings',
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

export const SMS_MENU: Menu[] = [
    {
        code: 7,
        name: 'SMS',
        path: '',
        icon: 'icon-speech',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Создать',
                    path: '/sm/sms/send',
                    icon: 'icon-share-alt',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Массовая рассылка',
                    path: '/sm/sms/mass-sending',
                    icon: 'icon-users',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 3,
                    name: 'Неотвеченные вызовы',
                    path: '/sm/sms/no-answer-call-sending',
                    icon: 'icon-call-end',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 4,
                    name: 'Статистика',
                    path: '/sm/sms/statistic',
                    icon: 'ft-align-left',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 5,
                    name: 'Настройки',
                    path: '/sm/sms/settings',
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

export const TELEGRAM_MENU: Menu[] = [
    {
        code: 8,
        name: 'Telegram',
        path: '',
        icon: 'icon-paper-plane',
        badge: '',
        badgeClass: '',
        externalLink: false,
        group: {
            lines: [
                {
                    code: 1,
                    name: 'Неотвеченные вызовы',
                    path: '/sm/telegram/no-answer-call',
                    icon: 'icon-call-end',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
                {
                    code: 2,
                    name: 'Неотвеченные вызовы',
                    path: '/sm/telegram/call',
                    icon: 'icon-call-out',
                    badge: '',
                    badgeClass: '',
                    externalLink: false,
                    group: { lines: [] },
                },
            ],
        },
    },
];

export const STATIC_MENU_BY_ROLE: { [role in Role]: Menu[] } = {
    [Role.api]: API_MENU,
    [Role.analitic]: ANALITIC_MENU,
    [Role.crm]: CRM_MENU,
    [Role.autoDial]: AUTO_DIAL_MENU,
    [Role.sms]: SMS_MENU,
    [Role.telegram]: TELEGRAM_MENU,
    [Role.kpi]: KPI_MENU,
};
