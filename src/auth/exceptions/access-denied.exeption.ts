import { ForbiddenException } from '@nestjs/common';
import { ACCESS_DENIED } from '../auth.consts';

export class AccessDeniedException extends ForbiddenException {
    constructor() {
        const message = ACCESS_DENIED;
        super(message);
    }
}
