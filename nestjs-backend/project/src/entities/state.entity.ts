import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity()
export class StateEntity {
  @PrimaryGeneratedColumn()
  state_id: number;

  @Column('varchar', {
    length: 31,
    nullable: false,
  })
  state_name: string;

  @Column('varchar', {
    length: 7,
    default: '#fff',
  })
  state_color: string;

  @ManyToOne(() => ProjectEntity, (project) => project.states)
  project: ProjectEntity;
}
