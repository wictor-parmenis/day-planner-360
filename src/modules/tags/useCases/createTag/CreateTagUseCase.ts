import { inject, injectable } from 'tsyringe';
import { ICreateTagDTO } from './ICreateTagDTO';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';
import { CreateTagWithSameDescriptionError } from './CreateTagError';

@injectable()
export class CreateTagUseCase {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute({ description }: ICreateTagDTO) {
    const tagsWithSamePartDescription =
      await this.tagsRepository.listByDescriptionPart(description);

    if (tagsWithSamePartDescription && tagsWithSamePartDescription.length) {
      tagsWithSamePartDescription.forEach((tag) => {
        const hasSameDescription = tag.description === description;

        if (hasSameDescription) {
          throw new CreateTagWithSameDescriptionError();
        }
      });
    }

    const tag = await this.tagsRepository.create({
      description,
    });

    return tag;
  }
}
