import { Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
