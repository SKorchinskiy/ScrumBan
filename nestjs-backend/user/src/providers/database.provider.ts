import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

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
        entities: [UserEntity],
        database: '',
        synchronize: true,
      });

      return await datasource.initialize();
    },
  },
];
