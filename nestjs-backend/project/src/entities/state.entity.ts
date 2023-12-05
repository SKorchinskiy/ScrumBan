import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IssueEntity } from './issue.entity';

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

  @OneToMany(() => IssueEntity, (issue) => issue.issue_state)
  issues: IssueEntity[];

  @Column('integer', { nullable: false })
  workspace_id: number;
}
