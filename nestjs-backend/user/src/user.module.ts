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
          port: 8001,
          host: 'backend-scrumban-auth',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ...databaseProviders, ...userProviders],
})
export class UserModule {}
