import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  Transport,
  TcpOptions,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3004,
    },
  } as TcpOptions);

  await app.startAllMicroservices();

  await app.listen(3004);
}
bootstrap();
