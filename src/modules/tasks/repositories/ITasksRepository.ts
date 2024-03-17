import { DeleteResult } from 'typeorm';
import { Task } from '../entities/Task';
import { ICreateTaskDTO } from '../useCases/createTask/ICreateTaskDTO';

export interface ITasksRepository {
  create: (data: ICreateTaskDTO) => Promise<Task>;
  findByTitle: (title: string) => Promise<Task | undefined>;
  findById: (task_id: string) => Promise<Task | undefined>;
  findByExecutionDate: (date_execution: string) => Promise<Task | undefined>;
  deleteTaskById: (task_id: string) => Promise<DeleteResult>;
}
