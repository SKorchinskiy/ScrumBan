import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import {
  MicroserviceOptions,
  Transport,
  TcpOptions,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 3003,
      host: '127.0.0.1',
    },
  } as TcpOptions);

  await app.startAllMicroservices();

  await app.listen(3003);
}
bootstrap();
