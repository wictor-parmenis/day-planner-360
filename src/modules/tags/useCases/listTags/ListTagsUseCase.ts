import { inject, injectable } from 'tsyringe';

import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';

@injectable()
export class ListTagsUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute() {
    const tagsList = await this.tagsRepository.list();

    return tagsList;
  }
}
