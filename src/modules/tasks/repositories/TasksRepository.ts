import { DeleteResult, getRepository, Repository } from 'typeorm';

import { Task } from '../entities/Task';
import { ITasksRepository } from './ITasksRepository';
import { ICreateTaskDTO } from '../useCases/createTask/ICreateTaskDTO';

export class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = getRepository(Task);
  }

  async findByTitle(title: string): Promise<Task | undefined> {
    return this.repository.findOne({
      title,
    });
  }

  async findByExecutionDate(date_execution: string): Promise<Task | undefined> {
    return this.repository.findOne({
      date_execution,
    });
  }

  async findById(task_id: string): Promise<Task | undefined> {
    return this.repository.findOne(task_id);
  }

  async create({
    date_execution,
    description,
    estimated_duration,
    title,
  }: ICreateTaskDTO): Promise<Task> {
    const task = this.repository.create({
      date_execution,
      description,
      estimated_duration,
      title,
    });

    return this.repository.save(task);
  }

  async deleteTaskById(task_id: string): Promise<DeleteResult> {
    return this.repository.delete(task_id);
  }
}
