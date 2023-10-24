import { ForbiddenException } from '@nestjs/common';

export class AccessDeniedException extends ForbiddenException {
    constructor() {
        const message = 'Access Denied';
        super(message);
    }
}
