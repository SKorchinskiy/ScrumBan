import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseProviders } from './providers/database.provider';
import { userProviders } from './providers/user.provider';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: {
          port: 3001,
          host: '127.0.0.1',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ...databaseProviders, ...userProviders],
})
export class UserModule {}
