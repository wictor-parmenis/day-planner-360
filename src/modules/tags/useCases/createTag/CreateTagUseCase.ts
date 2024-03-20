import { inject, injectable } from 'tsyringe';

import { ICreateTagDTO } from './ICreateTagDTO';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { LimitTagsRatedError } from '../../../../shared/errors/LimitTagsRatedError';
import { TaskNotFoundError } from '@shared/errors/TaskNotFoundError';

@injectable()
export class CreateTagUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,

    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ description }: ICreateTagDTO) {
    const lengthTags = await this.tagsRepository.list();

    if (lengthTags.length >= 10) {
      throw new LimitTagsRatedError();
    }

    const tag = await this.tagsRepository.create({
      description,
    });

    return tag;
  }
}
