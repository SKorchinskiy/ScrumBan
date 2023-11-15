import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { databaseProviders } from './providers/database.provider';
import { workspaceProviders } from './providers/workspace.provider';

@Module({
  imports: [],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, ...databaseProviders, ...workspaceProviders],
})
export class AppModule {}
