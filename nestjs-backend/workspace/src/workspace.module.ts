import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { databaseProviders } from './providers/database.provider';
import { workspaceProviders } from './providers/workspace.provider';
import { StatsModule } from './stats/stats.module';
import { StatsController } from './stats/stats.controller';
import { StatsService } from './stats/stats.service';

@Module({
  imports: [StatsModule],
  controllers: [StatsController, WorkspaceController],
  providers: [
    StatsService,
    WorkspaceService,
    ...databaseProviders,
    ...workspaceProviders,
  ],
})
export class AppModule {}
