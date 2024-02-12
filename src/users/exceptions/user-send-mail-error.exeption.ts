import { InternalServerErrorException } from '@nestjs/common';

export class UserSendMailErrorException extends InternalServerErrorException {
    constructor(email: string) {
        const message = `Проблемы с отправкой письма пользователю с email:  ${email}`;
        super(message);
    }
}
