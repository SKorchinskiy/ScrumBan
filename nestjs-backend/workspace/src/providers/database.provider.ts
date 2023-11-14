import { WorkspaceEntity } from 'src/entities/workspace.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5431,
        username: '',
        password: '',
        entities: [WorkspaceEntity],
        database: '',
        synchronize: true,
      });

      return await datasource.initialize();
    },
  },
];
