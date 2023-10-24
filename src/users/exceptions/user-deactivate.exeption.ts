import { ForbiddenException } from '@nestjs/common';

export class UserDeactivateException extends ForbiddenException {
    constructor(email: string) {
        const message = `Профиль пользователя с email: ${email} заблокирован`;
        super(message);
    }
}
