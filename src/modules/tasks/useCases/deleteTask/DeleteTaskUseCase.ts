import { inject, injectable } from 'tsyringe';

import { IDeleteTaskDTO } from './IDeleteTaskDTO';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { DeleteTaskError } from './DeleteTaskError';

@injectable()
export class DeleteTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ task_id }: IDeleteTaskDTO) {
    const taskExist = await this.tasksRepository.findById(task_id);

    if (taskExist) {
      throw new DeleteTaskError();
    }

    const taskDeletedResult =
      await this.tasksRepository.deleteTaskById(task_id);

    return taskDeletedResult;
  }
}
