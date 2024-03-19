import { inject, injectable } from 'tsyringe';

import { TagNotFoundError } from '@shared/errors/TagNotFoundError';
import { IUpdateTaskDTO } from './IUpdateTaskDTO';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { TaskNotFoundError } from '@shared/errors/TaskNotFoundError';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { NotValidTagError } from '@shared/errors/NotValidTagError';
import { Tag } from '@modules/tags/entities/Tag';

@injectable()
export class UpdateTaskUseCase {
  constructor(
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({
    date_execution,
    description,
    estimated_duration,
    tags_ids,
    task_id,
    title,
  }: IUpdateTaskDTO) {
    const taskExist = await this.tasksRepository.findById(task_id);

    if (!taskExist) {
      throw new TaskNotFoundError();
    }

    const tags: Tag[] = [];
    let existNotValidTag = false;
    if (tags_ids.length) {
      tags_ids.forEach(async (tag_id) => {
        const tagExist = await this.tagsRepository.findById(tag_id);
        if (!tagExist) {
          existNotValidTag = true;
        }
        tags.push(tagExist);
      });
    }

    if (existNotValidTag) {
      throw new NotValidTagError();
    }

    const taskUpdated = await this.tasksRepository.updateById({
      date_execution,
      description,
      estimated_duration,
      tags,
      task_id,
      title,
    });

    return taskUpdated;
  }
}
