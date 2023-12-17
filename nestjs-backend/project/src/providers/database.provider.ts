import { IssueEntity } from 'src/entities/issue.entity';
import { LabelEntity } from 'src/entities/label.entity';
import { MemberEntity } from 'src/entities/member.entity';
import { ProjectEntity } from 'src/entities/project.entity';
import { SprintEntity } from 'src/entities/sprint.entity';
import { StateEntity } from 'src/entities/state.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        username: 'admin',
        password: 'admin',
        port: 5432,
        database: 'scrumban',
        entities: [
          IssueEntity,
          LabelEntity,
          MemberEntity,
          ProjectEntity,
          SprintEntity,
          StateEntity,
        ],
        synchronize: true,
      });

      return await dataSource.initialize();
    },
  },
];
