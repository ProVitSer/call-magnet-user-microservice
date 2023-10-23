import { ForbiddenException } from '@nestjs/common';

export class UserNotExistsException extends ForbiddenException {
    constructor() {
        const message = `Пользователь не найден`;
        super(message);
    }
}
