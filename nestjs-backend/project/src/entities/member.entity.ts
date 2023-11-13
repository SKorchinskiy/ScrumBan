import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity()
export class MemberEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  user_id: number;

  @ManyToMany(() => ProjectEntity)
  @JoinTable()
  project: ProjectEntity;

  @Column({
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: string;
}
