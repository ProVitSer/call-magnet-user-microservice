import { BadRequestException } from '@nestjs/common';

export class UserNotActiveException extends BadRequestException {
    constructor(email: string) {
        const message = `Профиль пользователя с email: ${email} не активирован`;
        super(message);
    }
}
