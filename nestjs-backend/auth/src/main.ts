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
      port: 8001,
      host: 'backend-scrumban-auth',
    },
  } as TcpOptions);

  await app.startAllMicroservices();

  // await app.listen(8001);
}
bootstrap();
