import { BadRequestException } from '@nestjs/common';

export class UserAlreadyExistsException extends BadRequestException {
    constructor(email: string) {
        const message = `Профиль пользователя с email: ${email} зарегистрирован`;
        super(message);
    }
}
