import { BadRequestException } from '@nestjs/common';

export class UserIsActiveException extends BadRequestException {
    constructor(email: string) {
        const message = `Пользователь с email - ${email} уже активирован`;
        super(message);
    }
}
