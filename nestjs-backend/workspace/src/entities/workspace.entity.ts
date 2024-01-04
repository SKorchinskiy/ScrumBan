import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StatsEntity } from './stats.entity';
@Entity()
export class WorkspaceEntity {
  @PrimaryGeneratedColumn()
  workspace_id: number;

  @Column({
    length: 31,
    nullable: false,
  })
  workspace_name: string;

  @Column({ nullable: false })
  workspace_owner: number;

  @OneToMany(() => StatsEntity, (stats) => stats.statId)
  stats: StatsEntity[];
}
