import { Module } from '@nestjs/common';
import { SprintController } from './sprint.controller';
import { SprintService } from './sprint.service';
import { databaseProviders } from 'src/providers/database.provider';
import { projectProviders } from 'src/providers/project.provider';

@Module({
  controllers: [SprintController],
  providers: [SprintService, ...databaseProviders, ...projectProviders],
})
export class SprintModule {}
