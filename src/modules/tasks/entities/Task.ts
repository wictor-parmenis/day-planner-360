import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Tag } from '@modules/tags/entities/Tag';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Tag, (tag) => tag.task)
  tag: Tag[];

  @Column()
  estimated_duration: Number; // time in miliseconds;

  @Column({ nullable: false })
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
