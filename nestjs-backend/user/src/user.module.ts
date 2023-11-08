import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseProviders } from './providers/database.provider';
import { userProviders } from './providers/user.provider';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, ...databaseProviders, ...userProviders],
})
export class UserModule {}
