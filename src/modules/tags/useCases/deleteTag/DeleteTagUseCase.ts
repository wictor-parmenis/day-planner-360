import { inject, injectable } from 'tsyringe';

import { IDeleteTagDTO } from './IDeleteTagDTO';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { TagNotFoundError } from '@shared/errors/TagNotFoundError';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';

@injectable()
export class DeleteTagUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('TasksRepository')
    private tasksRepository: ITasksRepository
  ) {}

  async execute({ tag_id }: IDeleteTagDTO) {
    const tagExist = await this.tagsRepository.findById(tag_id);

    if (!tagExist) {
      throw new TagNotFoundError();
    }

    const tasksWithTag = await this.tasksRepository.findByTags([tag_id]);
    if (tasksWithTag && tasksWithTag.length) {
      tasksWithTag.forEach(async (task) => {
        task.tags = task.tags.filter((task_tag) => task_tag.id !== tag_id);

        await this.tasksRepository.updateById({
          date_execution: task.date_execution,
          description: task.description,
          estimated_duration: task.estimated_duration,
          tags_ids: task.tags.map((tag) => tag.id),
          task_id: task.id,
          title: task.title,
        });
      });
    }

    return this.tagsRepository.deleteById(tag_id);
  }
}
