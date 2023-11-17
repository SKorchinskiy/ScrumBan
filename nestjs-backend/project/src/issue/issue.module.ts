import { Module } from '@nestjs/common';
import { IssueController } from './issue.controller';
import { IssueService } from './issue.service';
import { databaseProviders } from 'src/providers/database.provider';
import { projectProviders } from 'src/providers/project.provider';
import { StateService } from 'src/state/state.service';

@Module({
  controllers: [IssueController],
  providers: [
    IssueService,
    StateService,
    ...databaseProviders,
    ...projectProviders,
  ],
})
export class IssueModule {}
