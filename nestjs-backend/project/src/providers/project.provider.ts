import { IssueEntity } from 'src/entities/issue.entity';
import { LabelEntity } from 'src/entities/label.entity';
import { MemberEntity } from 'src/entities/member.entity';
import { ProjectEntity } from 'src/entities/project.entity';
import { SprintEntity } from 'src/entities/sprint.entity';
import { StateEntity } from 'src/entities/state.entity';
import { DataSource } from 'typeorm';

export const projectProviders = [
  {
    provide: 'PROJECT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ProjectEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'MEMBER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(MemberEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'LABEL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LabelEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'ISSUE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(IssueEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'STATE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StateEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SPRINT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SprintEntity),
    inject: ['DATA_SOURCE'],
  },
];
