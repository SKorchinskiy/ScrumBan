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
        host: 'localhost',
        port: 5431,
        username: '',
        password: '',
        entities: [
          IssueEntity,
          LabelEntity,
          MemberEntity,
          ProjectEntity,
          SprintEntity,
          StateEntity,
        ],
        database: '',
        synchronize: true,
      });

      return await dataSource.initialize();
    },
  },
];
