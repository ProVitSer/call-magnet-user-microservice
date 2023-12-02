import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger, ValidationPipe } from '@nestjs/common';

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

    const httpApp = await NestFactory.create(AppModule);

    httpApp.useGlobalPipes(new ValidationPipe());

    const httpPort = process.env.HTTP_PORT || 3000;
    await httpApp.listen(httpPort);
}
bootstrap();
