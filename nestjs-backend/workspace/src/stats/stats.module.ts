import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { databaseProviders } from 'src/providers/database.provider';
import { workspaceProviders } from 'src/providers/workspace.provider';

@Module({
  controllers: [StatsController],
  providers: [StatsService, ...databaseProviders, ...workspaceProviders],
})
export class StatsModule {}
