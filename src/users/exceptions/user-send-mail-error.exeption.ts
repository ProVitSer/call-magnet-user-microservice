import { BadRequestException } from '@nestjs/common';

export class UserSendMailErrorException extends BadRequestException {
    constructor(email: string) {
        const message = `Проблемы с отправкой проверочного письма пользователю с email:  ${email}`;
        super(message);
    }
}
