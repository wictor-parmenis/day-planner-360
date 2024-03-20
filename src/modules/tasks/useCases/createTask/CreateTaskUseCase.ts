import { inject, injectable } from 'tsyringe';

import { ICreateTaskDTO } from './ICreateTaskDTO';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { CreateTaskError } from './CreateTaskError';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { Tag } from '@modules/tags/entities/Tag';
import { isEmpty } from 'lodash';

@injectable()
export class CreateTaskUseCase {
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
    title,
    tags_ids,
  }: ICreateTaskDTO) {
    const completedTimetable =
      await this.tasksRepository.findByExecutionDate(date_execution);

    if (completedTimetable) {
      throw new CreateTaskError();
    }

    let tagsOfTask: Tag[] = [];
    if (tags_ids && tags_ids.length) {
      tags_ids.forEach(async (tag_id) => {
        const tag = await this.tagsRepository.findById(tag_id);
        if (!isEmpty(tag)) {
          tagsOfTask.push(tag);
        }
      });
    }
    const user = await this.tasksRepository.create({
      date_execution,
      description,
      estimated_duration,
      title,
      tags: tagsOfTask,
    });

    return user;
  }
}
