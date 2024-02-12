import { BadRequestException } from '@nestjs/common';

export class UserVerifyProfileException extends BadRequestException {
    constructor() {
        const message = `Невозможно активировать пользователя, некорректно переданные данные`;
        super(message);
    }
}
