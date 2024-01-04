import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WorkspaceEntity } from './workspace.entity';

@Entity()
export class StatsEntity {
  @PrimaryGeneratedColumn()
  statId: number;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.workspace_id, {
    nullable: false,
  })
  workspace: WorkspaceEntity;

  @Column({ default: 0 })
  countOfActivities: number;

  @Column({ type: 'date', default: new Date().toISOString().split('T')[0] })
  createdAt: string;
}
