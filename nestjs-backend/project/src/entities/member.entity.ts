import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity()
export class MemberEntity {
  @PrimaryColumn()
  user_id: number;

  @Column('varchar', { length: 127, unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 127, nullable: false })
  display_name: string;

  @ManyToMany(() => ProjectEntity)
  @JoinColumn()
  projects: ProjectEntity[];
}
