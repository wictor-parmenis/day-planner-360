import { inject, injectable } from 'tsyringe';

import { IUpdateTagDTO } from './IUpdateTagDTO';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { TagNotFoundError } from '@shared/errors/TagNotFoundError';

@injectable()
export class UpdateTagUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ new_description, tag_id }: IUpdateTagDTO) {
    const tagExist = await this.tagsRepository.findById(tag_id);

    if (!tagExist) {
      throw new TagNotFoundError();
    }
    const tagUpdated = await this.tagsRepository.updateById({
      new_description,
      tag_id,
    });

    return tagUpdated;
  }
}
