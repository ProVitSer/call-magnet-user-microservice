import { ForbiddenException } from '@nestjs/common';

export class IncorrectOldPasswordException extends ForbiddenException {
    constructor() {
        const message = `Указан неправильный действующий пароль`;
        super(message);
    }
}
