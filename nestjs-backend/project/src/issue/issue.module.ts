import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { databaseProviders } from 'src/providers/database.provider';
import { projectProviders } from 'src/providers/project.provider';

@Module({
  controllers: [IssueController],
  providers: [IssueService, ...databaseProviders, ...projectProviders],
})
export class IssueModule {}
