import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {
  MicroserviceOptions,
  TcpOptions,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3001,
      host: '127.0.0.1',
    },
  } as TcpOptions);

  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
