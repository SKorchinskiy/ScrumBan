import { NestFactory } from '@nestjs/core';
import { ProjectModule } from './project.module';
import {
  MicroserviceOptions,
  Transport,
  TcpOptions,
} from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ProjectModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8002,
      host: '127.0.0.1',
    },
  } as TcpOptions);

  await app.startAllMicroservices();

  await app.listen(8002);
}
bootstrap();
