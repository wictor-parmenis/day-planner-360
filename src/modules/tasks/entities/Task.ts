import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Statement } from '../../statements/entities/Statement';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  description: string;

  // @OneToMany(() => Statement, (statement) => statement.user)
  // tags: Statement[];

  @Column()
  estimated_duration: Number; // time in miliseconds;

  @Column()
  date_execution: string;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
