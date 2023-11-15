import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { WorkspaceController } from './workspace/workspace.controller';
import { WorkspaceService } from './workspace/workspace.service';

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
      {
        name: 'PROJECT',
        transport: Transport.TCP,
        options: {
          port: 3002,
          host: '127.0.0.1',
        },
      },
      {
        name: 'USER',
        transport: Transport.TCP,
        options: {
          port: 3003,
          host: '127.0.0.1',
        },
      },
      {
        name: 'WORKSPACE',
        transport: Transport.TCP,
        options: {
          port: 3004,
          host: '127.0.0.1',
        },
      },
    ]),
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    ProjectController,
    WorkspaceController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    ProjectService,
    WorkspaceService,
  ],
})
export class AppModule {}
