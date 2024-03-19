import { DeleteResult, getRepository, Repository } from 'typeorm';

import { Task } from '../entities/Task';
import { ITasksRepository } from './ITasksRepository';
import { ICreateTaskDTO } from '../useCases/createTask/ICreateTaskDTO';
import { IListTasksByIntervalDTO } from '../useCases/listTasksByInterval/IListTasksByIntervalDTO';
import {
  IUpdateTaskDTO,
  IUpdateTaskRepositoryDTO,
} from '../useCases/updateTask/IUpdateTaskDTO';

export class TasksRepository implements ITasksRepository {
  private repository: Repository<Task>;

  constructor() {
    this.repository = getRepository(Task);
  }

  async listByTitlePart(title_part: string): Promise<Task[] | undefined> {
    return this.repository
      .createQueryBuilder('tasks')
      .where('tasks.title LIKE :text', { text: `%${title_part}%` })
      .getMany();
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

  async updateById({
    date_execution,
    description,
    estimated_duration,
    tags,
    task_id,
  }: IUpdateTaskRepositoryDTO): Promise<Task> {
    const taskFound = await this.repository.findOne(task_id);
    Object.assign(taskFound, {
      date_execution,
      description,
      estimated_duration,
      tags,
    });

    console.log('taskFound', taskFound);

    return this.repository.save(taskFound);
  }

  async deleteTaskById(task_id: string): Promise<DeleteResult> {
    return this.repository.delete(task_id);
  }

  async listTasksByInterval({
    initial_date,
    final_date,
  }: IListTasksByIntervalDTO): Promise<Task[]> {
    return this.repository
      .createQueryBuilder('tasks')
      .where('tasks.date_execution >= :initial_date', { initial_date })
      .andWhere('tasks.date_execution <= :final_date', { final_date })
      .getMany();
  }
}
