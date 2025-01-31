import { inject, injectable } from 'tsyringe';

import { IDeleteTaskDTO } from './IDeleteTaskDTO';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { TaskNotFoundError } from '@shared/errors/TaskNotFoundError';

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ task_id }: IDeleteTaskDTO) {
    const taskExist = await this.tasksRepository.findById(task_id);

    if (!taskExist) {
      throw new TaskNotFoundError();
    }

    return this.tasksRepository.deleteTaskById(task_id);
  }
}
