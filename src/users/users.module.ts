import { Module, Provider } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { AuthModule } from '@app/auth/auth.module';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

const clientProxyProvider: Provider = {
    provide: 'MAIL_SERVICE',
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
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService, clientProxyProvider],
    exports: [UsersService],
})
export class UsersModule {}
