import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { IListTasksByTitlePartDTO } from './IListTasksByTitlePartDTO';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { isEmpty } from 'lodash';

@injectable()
export class ListTasksByTitlePartUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ title_part }: IListTasksByTitlePartDTO) {
    const taskList = await this.tasksRepository.listByTitlePart(title_part);

    return taskList;
  }
}
