import { inject, injectable } from 'tsyringe';

import { IListTasksByIntervalDTO } from './IListTasksByIntervalDTO';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';

@injectable()
export class ListTasksByIntervalUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ final_date, initial_date }: IListTasksByIntervalDTO) {
    const taskList = await this.tasksRepository.listTasksByInterval({
      final_date,
      initial_date,
    });

    return taskList;
  }
}
