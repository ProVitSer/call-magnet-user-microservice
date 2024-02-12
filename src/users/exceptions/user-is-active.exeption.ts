import { ForbiddenException } from '@nestjs/common';

export class UserIsActiveException extends ForbiddenException {
    constructor(email: string) {
        const message = `Пользователь с email - ${email} уже активирован`;
        super(message);
    }
}
