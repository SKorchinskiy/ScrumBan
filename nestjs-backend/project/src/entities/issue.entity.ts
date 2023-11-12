import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { SprintEntity } from './sprint.entity';
import { StateEntity } from './state.entity';
import { LabelEntity } from './label.entity';
import { MemberEntity } from './member.entity';

@Entity()
export class IssueEntity {
  @PrimaryGeneratedColumn()
  issue_id: number;

  @Column('varchar', {
    length: 63,
    nullable: false,
  })
  issue_title: string;

  @Column({
    length: 255,
    default: '',
  })
  issue_description: string;

  @Column({
    enum: ['None', 'Low', 'Medium', 'High', 'Urgent'],
    default: 'None',
  })
  issue_priority: string;

  @OneToOne(() => StateEntity)
  @JoinColumn()
  issue_state: StateEntity;

  @ManyToMany(() => LabelEntity)
  @JoinTable()
  issue_labels: LabelEntity[];

  @ManyToOne(() => SprintEntity, (sprint) => sprint.issues)
  sprint: SprintEntity;

  @ManyToMany(() => MemberEntity)
  @JoinTable()
  assignees: MemberEntity[];
}
