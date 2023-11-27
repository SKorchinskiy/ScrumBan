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
import { IssueController } from './project/issue/issue.controller';
import { IssueService } from './project/issue/issue.service';
import { StateController } from './project/state/state.controller';
import { StateService } from './project/state/state.service';
import { LabelController } from './project/label/label.controller';
import { LabelService } from './project/label/label.service';
import { SprintController } from './project/sprint/sprint.controller';
import { SprintService } from './project/sprint/sprint.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('AUTH_SECRET_SIGNATURE'),
        };
      },
    }),
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
    IssueController,
    StateController,
    LabelController,
    SprintController,
  ],
  providers: [
    AppService,
    UserService,
    AuthService,
    ProjectService,
    WorkspaceService,
    IssueService,
    StateService,
    LabelService,
    SprintService,
    ConfigService,
  ],
})
export class AppModule {}
