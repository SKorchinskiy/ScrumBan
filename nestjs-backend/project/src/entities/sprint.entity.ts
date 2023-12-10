import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProjectEntity } from './project.entity';
import { IssueEntity } from './issue.entity';

@Entity()
export class SprintEntity {
  @PrimaryGeneratedColumn()
  sprint_id: number;

  @Column('varchar', {
    length: 63,
    nullable: false,
  })
  sprint_title: string;

  @Column('varchar', {
    length: 255,
    default: '',
  })
  sprint_description: string;

  @Column('date')
  sprint_start_date: Date;

  @Column('date')
  sprint_end_date: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.sprints, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @OneToMany(() => IssueEntity, (issue) => issue.sprint)
  issues: IssueEntity[];
}
