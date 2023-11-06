import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, TcpOptions, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        options: {
          transport: Transport.TCP,
          options: {
            port: 3001,
          },
        } as TcpOptions,
      },
      {
        name: 'PROJECT',
        options: {
          transport: Transport.TCP,
          options: {
            port: 3002,
          },
        } as TcpOptions,
      },
      {
        name: 'USER',
        options: {
          transport: Transport.TCP,
          options: {
            port: 3003,
          },
        } as TcpOptions,
      },
      {
        name: 'WORKSPACE',
        options: {
          transport: Transport.TCP,
          options: {
            port: 3004,
          },
        } as TcpOptions,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
