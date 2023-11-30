import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SprintEntity } from './sprint.entity';
import { LabelEntity } from './label.entity';

import { IssueEntity } from './issue.entity';

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

  @Column()
  workspace_id: number;

  @Column({ enum: ['public', 'private'], default: 'private' })
  project_access: string;

  @OneToMany(() => SprintEntity, (sprint) => sprint.project)
  sprints: SprintEntity[];

  @OneToMany(() => LabelEntity, (label) => label.project)
  labels: LabelEntity[];

  @OneToMany(() => IssueEntity, (issue) => issue.project)
  issues: IssueEntity[];
}
