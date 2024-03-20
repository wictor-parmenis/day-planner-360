import { DeleteResult } from 'typeorm';
import { Task } from '../entities/Task';
import { ICreateTaskRepositoryDTO } from '../useCases/createTask/ICreateTaskDTO';
import { IListTasksByIntervalDTO } from '../useCases/listTasksByInterval/IListTasksByIntervalDTO';
import { IUpdateTaskRepositoryDTO } from '../useCases/updateTask/IUpdateTaskDTO';

export interface ITasksRepository {
  create: (data: ICreateTaskRepositoryDTO) => Promise<Task>;
  listByTitlePart: (titlePart: string) => Promise<Task[] | undefined>;
  findById: (task_id: string) => Promise<Task | undefined>;
  findByExecutionDate: (date_execution: string) => Promise<Task | undefined>;
  deleteTaskById: (task_id: string) => Promise<DeleteResult>;
  listTasksByInterval: (
    data: IListTasksByIntervalDTO
  ) => Promise<Task[] | undefined>;
  updateById: (data: IUpdateTaskRepositoryDTO) => Promise<Task | undefined>;
  findByTags: (tags_ids: string[]) => Promise<Task[]>;
}
