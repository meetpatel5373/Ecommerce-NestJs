import { Roles } from 'src/shared/enum/roles';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.customer,
  })
  role: Roles;

  @Column({ length: 255 })
  email: string;

  @Column('text')
  password: string;

  @Column({ length: 64 })
  first_name: string;

  @Column({ length: 64 })
  last_name: string;

  @Column({ length: 128 })
  display_name: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
