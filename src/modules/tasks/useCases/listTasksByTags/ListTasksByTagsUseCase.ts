import { inject, injectable } from 'tsyringe';

import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { isEmpty } from 'lodash';
import { IListTasksByTagsDTO } from './IListTasksByTagsDTO';
import { log } from 'util';

@injectable()
export class ListTasksByTagsUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ tags_ids }: IListTasksByTagsDTO) {
    const taskList = await this.tasksRepository.findByTags(tags_ids);

    if (isEmpty(taskList)) {
      return [];
    }

    return taskList;
  }
}
