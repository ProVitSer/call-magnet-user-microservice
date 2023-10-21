import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@app/config/config.provider';
import { AuthModule } from './auth/auth.module';
import { AppLoggerModule } from './app-logger/app-logger.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: configuration(),
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        AppLoggerModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class AppModule {}
