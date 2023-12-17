import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const datasource = new DataSource({
        type: 'postgres',
        host: 'postgres',
        username: 'admin',
        password: 'admin',
        database: 'scrumban',
        port: 5432,
        entities: [UserEntity],
        synchronize: true,
      });

      return await datasource.initialize();
    },
  },
];
