import { NestFactory } from '@nestjs/core';
import { AppModule } from './workspace.module';
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
      port: 8004,
      host: 'backend-scrumban-workspace',
    },
  } as TcpOptions);

  await app.startAllMicroservices();

  // await app.listen(8004);
}
bootstrap();
