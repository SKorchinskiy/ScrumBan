import { StatsEntity } from 'src/entities/stats.entity';
import { WorkspaceEntity } from 'src/entities/workspace.entity';
import { DataSource } from 'typeorm';

export const workspaceProviders = [
  {
    provide: 'WORKSPACE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WorkspaceEntity),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'STATS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(StatsEntity),
    inject: ['DATA_SOURCE'],
  },
];
