import { Module, Provider } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { TokenService } from './services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UsersModule } from '@app/users/users.module';
import { ClientProxyProvide } from '@app/platform-types/client-proxy/types';
import { NotificationModule } from '@app/notification/notification.module';

const clientProxyProvider: Provider = {
    provide: ClientProxyProvide.mail,
    useFactory: (): ClientProxy => {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: process.env.MAIL_SERVICE_QUEUE,
                queueOptions: { durable: false },
            },
        });
    },
};

@Module({
    imports: [JwtModule.register({}), UsersModule, NotificationModule],
    controllers: [AuthController],
    providers: [AuthService, TokenService, clientProxyProvider],
    exports: [AuthService, TokenService],
})
export class AuthModule {}
