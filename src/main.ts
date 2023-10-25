import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [process.env.RMQ_URL],
            queue: process.env.USER_SERVICE_QUEUE,
            queueOptions: { durable: false },
        },
    });

    app.listen().then(() => Logger.log('User microservice start and listening on RabbitMQ'));
}
bootstrap();
