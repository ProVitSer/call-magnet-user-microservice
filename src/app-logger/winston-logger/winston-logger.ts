import { IAppLogger, LogPayload } from '../interfaces/app-logger.interfaces';
import * as winston from 'winston';
import { Logger, createLogger, format } from 'winston';
import 'winston-daily-rotate-file';
const { combine, timestamp, printf, splat } = winston.format;
import * as Transport from 'winston-transport';
import { LogLevel } from '../interfaces/app-logger.enum';

export class WinstonLogger implements IAppLogger {
    private logger: Logger;
    constructor() {
        const getTransport = (logType: LogLevel): Transport => {
            switch (logType) {
                case LogLevel.console:
                    return new winston.transports.Console({
                        format:
                            process.env.NODE_ENV === 'production' ? format.simple() : format.combine(format.colorize(), format.simple()),
                    });
                default:
                    return new winston.transports.DailyRotateFile({
                        dirname: './log/',
                        level: logType,
                        filename: `%DATE%-${logType}.log`,
                        datePattern: 'YYYY-MM-DD',
                        handleExceptions: true,
                        json: true,
                        zippedArchive: false,
                        maxSize: '20m',
                        maxFiles: '14d',
                    });
            }
        };

        const getTransports = (logTransports: LogLevel[]): Transport[] => {
            return logTransports.map((type: LogLevel) => {
                return getTransport(type);
            });
        };
        this.logger = createLogger({
            format: combine(
                timestamp(),
                splat(),
                printf(({ level, context, message, timestamp, clienId }) => {
                    return `[${level}]  ${timestamp} : ${message}`;
                }),
            ),
            transports: getTransports([LogLevel.console, LogLevel.info, LogLevel.error]),
        });
    }

    log(message: string, payload: LogPayload) {
        this.logger.info(message, { context: payload.context, clienId: payload.clienId });
    }

    info(message: string, payload: LogPayload) {
        this.logger.info(message, { context: payload.context, clienId: payload.clienId });
    }

    error(message: string, payload: LogPayload) {
        this.logger.error(message, { context: payload.context, clienId: payload.clienId });
    }

    warn(message: string, payload: LogPayload) {
        this.logger.warn(message, { context: payload.context, clienId: payload.clienId });
    }

    debug(message: string, payload: LogPayload) {
        this.logger.debug(message, { context: payload.context, clienId: payload.clienId });
    }
}
