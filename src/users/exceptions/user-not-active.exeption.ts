import { ForbiddenException } from '@nestjs/common';

export class UserNotActiveException extends ForbiddenException {
    constructor(email: string) {
        const message = `Профиль пользователя с email: ${email} не активирован`;
        super(message);
    }
}
