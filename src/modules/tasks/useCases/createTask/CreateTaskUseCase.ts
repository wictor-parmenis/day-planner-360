import { inject, injectable } from 'tsyringe';

import { ICreateTaskDTO } from './ICreateTaskDTO';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { CreateTaskError } from './CreateTaskError';

@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({
    date_execution,
    description,
    estimated_duration,
    title,
  }: ICreateTaskDTO) {
    const completedTimetable =
      await this.tasksRepository.findByExecutionDate(date_execution);

    if (completedTimetable) {
      throw new CreateTaskError();
    }

    const user = await this.tasksRepository.create({
      date_execution,
      description,
      estimated_duration,
      title,
    });

    return user;
  }
}
