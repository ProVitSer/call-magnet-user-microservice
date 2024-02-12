import { UnauthorizedException } from '@nestjs/common';

export class IncorrectUserPasswordException extends UnauthorizedException {
    constructor() {
        const message = `Введен некорректный пароль`;
        super(message);
    }
}
