import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';
  import { v4 as uuid } from 'uuid';
  import { User } from './User'
    
  @Entity('users_token')
  export class UsersToken {
    @PrimaryGeneratedColumn('uuid')
    id?: string;
  
    @Column()
    refresh_token: string;
  
    @ManyToOne(() => User, user => user.id)
    @JoinColumn({ name: 'user_id' })
    user_id: string;
  
    @Column()
    expires_date: Date;
  
    @CreateDateColumn()
    created_at: Date;
  
    constructor() {
      if(!this.id) {
        this.id = uuid();
      }
    }
  }
  