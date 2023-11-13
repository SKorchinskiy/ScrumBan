import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { SprintEntity } from './sprint.entity';
import { LabelEntity } from './label.entity';
import { StateEntity } from './state.entity';
import { MemberEntity } from './member.entity';

@Entity()
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column('varchar', {
    length: 63,
    nullable: false,
  })
  project_name: string;

  @Column('varchar', {
    length: 255,
    default: '',
  })
  project_description: string;

  @ManyToOne(() => MemberEntity)
  project_owner: MemberEntity;

  @Column({ enum: ['public', 'private'], default: 'private' })
  project_access: string;

  @OneToMany(() => SprintEntity, (sprint) => sprint.project)
  sprints: SprintEntity[];

  @OneToMany(() => LabelEntity, (label) => label.project)
  labels: LabelEntity[];

  @OneToMany(() => StateEntity, (state) => state.project)
  states: StateEntity[];
}
