import { NotFoundException } from '@nestjs/common';

export class UserVerifyProfileException extends NotFoundException {
    constructor() {
        const message = `Невозможно активировать пользователя, некорректно переданные данные`;
        super(message);
    }
}
