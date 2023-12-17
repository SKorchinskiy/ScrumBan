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
      port: 8003,
      host: 'backend-scrumban-user',
    },
  } as TcpOptions);

  await app.startAllMicroservices();

  // await app.listen(8003);
}
bootstrap();
