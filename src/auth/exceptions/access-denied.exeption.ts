import { ForbiddenException } from '@nestjs/common';
import { ACCESS_DENIED } from '../auth.constants';

export class AccessDeniedException extends ForbiddenException {
    constructor() {
        const message = ACCESS_DENIED;
        super(message);
    }
}
