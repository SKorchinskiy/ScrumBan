import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { SprintModule } from './sprint/sprint.module';
import { IssueModule } from './issue/issue.module';
import { LabelModule } from './label/label.module';
import { StateModule } from './state/state.module';
import { MemberModule } from './member/member.module';
import { projectProviders } from './providers/project.provider';
import { databaseProviders } from './providers/database.provider';

@Module({
  imports: [SprintModule, IssueModule, LabelModule, StateModule, MemberModule],
  controllers: [ProjectController],
  providers: [ProjectService, ...databaseProviders, ...projectProviders],
})
export class ProjectModule {}
