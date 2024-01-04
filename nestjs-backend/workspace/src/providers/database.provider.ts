import { StatsEntity } from 'src/entities/stats.entity';
import { WorkspaceEntity } from 'src/entities/workspace.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        port: 5432,
        username: 'admin',
        password: 'admin',
        entities: [WorkspaceEntity, StatsEntity],
        database: 'scrumban',
        synchronize: true,
      });

      return await datasource.initialize();
    },
  },
];
