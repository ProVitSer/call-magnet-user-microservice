import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/config/config.provider';
import { AuthModule } from './auth/auth.module';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationModule } from './notification/notification.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: configuration(),
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        AppLoggerModule,
        UsersModule,
        AuthModule,
        NotificationModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
