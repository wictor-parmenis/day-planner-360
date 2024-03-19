import { inject, injectable } from 'tsyringe';

import { IDeleteTagDTO } from './IDeleteTagDTO';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { TagNotFoundError } from '@shared/errors/TagNotFoundError';

@injectable()
export class DeleteTagUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ tag_id }: IDeleteTagDTO) {
    const tagExist = await this.tagsRepository.findById(tag_id);

    if (!tagExist) {
      throw new TagNotFoundError();
    }

    return this.tagsRepository.deleteById(tag_id);
  }
}
