import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column('varchar', { length: 63, nullable: false })
  first_name: string;

  @Column('varchar', { length: 63, nullable: false })
  last_name: string;

  @Column('varchar', { length: 127, unique: true, nullable: false })
  email: string;

  @Column('varchar', { length: 127, nullable: false })
  display_name: string;

  @Column('char', { length: 2, default: 'UA' })
  timezone: string;
}
