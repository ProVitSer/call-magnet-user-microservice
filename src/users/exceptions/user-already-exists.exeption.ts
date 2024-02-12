import { ForbiddenException } from '@nestjs/common';

export class UserAlreadyExistsException extends ForbiddenException {
    constructor(email: string) {
        const message = `Профиль пользователя с email: ${email} уже зарегистрирован`;
        super(message);
    }
}
