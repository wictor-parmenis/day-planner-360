import { inject, injectable } from 'tsyringe';

import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { TaskNotFoundError } from '@shared/errors/TaskNotFoundError';

@injectable()
export class ListTagsByTaskIdUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute(task_id: string) {
    const taskExist = await this.tasksRepository.findById(task_id);

    if (!taskExist) {
      throw new TaskNotFoundError();
    }
    const tagsList = await this.tagsRepository.findByTaskId(task_id);

    return tagsList;
  }
}
