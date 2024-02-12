import { Global, Module } from '@nestjs/common';
import { AppLoggerService } from './app-logger.service';
import { WinstonLogger } from './winston-logger/winston-logger';

@Global()
@Module({
    providers: [{ useClass: WinstonLogger, provide: 'LOGGER' }, AppLoggerService],
    exports: [AppLoggerService],
})
export class AppLoggerModule {}
