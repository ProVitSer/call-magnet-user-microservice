import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { IAppLogger, LogPayload } from './interfaces/app-logger.interfaces';

@Injectable()
export class AppLoggerService implements LoggerService {
    constructor(@Inject('LOGGER') private readonly logger: IAppLogger) {}

    log(message: string, payload: LogPayload = {}) {
        this.logger.log(message, payload);
    }

    error(message: string, payload: LogPayload = {}) {
        this.logger.error(message, payload);
    }

    warn(message: string, payload: LogPayload = {}) {
        this.logger.warn(message, payload);
    }

    debug(message: string, payload: LogPayload = {}) {
        this.logger.debug(message, payload);
    }
}
