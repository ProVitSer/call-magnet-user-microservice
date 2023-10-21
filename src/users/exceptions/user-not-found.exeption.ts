import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(id: string) {
        const message = `Пользователь ${id} не найден`;
        super(message);
    }
}
