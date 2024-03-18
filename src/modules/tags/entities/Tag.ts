import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Task } from '@modules/tasks/entities/Task';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column('uuid')
  task_id: string;

  @ManyToOne(() => Task, (task) => task.tag)
  @JoinColumn({ name: 'task_id' })
  task: Task;

  @Column()
  description: string;

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
