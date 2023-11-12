import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity()
export class LabelEntity {
  @PrimaryGeneratedColumn()
  label_id: number;

  @Column('varchar', {
    length: 31,
    nullable: false,
  })
  label_name: string;

  @ManyToOne(() => ProjectEntity, (project) => project.labels)
  project: ProjectEntity;
}
