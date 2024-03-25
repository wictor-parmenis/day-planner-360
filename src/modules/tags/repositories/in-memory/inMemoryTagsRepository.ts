import { DeleteResult } from 'typeorm';
import { Tag } from '@modules/tags/entities/Tag';
import { ITagsRepository } from '../ITagsRepository';
import { ICreateTagDTO } from '@modules/tags/useCases/createTag/ICreateTagDTO';
import { IUpdateTagDTO } from '@modules/tags/useCases/updateTag/IUpdateTagDTO';

export class InMemoryTagsRepository implements ITagsRepository {
  private tags: Tag[] = [];

  async create(data: ICreateTagDTO): Promise<Tag> {
    const tag = new Tag();
    Object.assign(tag, data);
    this.tags.push(tag);
    return tag;
  }

  async findById(tag_id: string): Promise<Tag> {
    const tagFound = this.tags.find((tag) => tag.id === tag_id);
    return tagFound;
  }

  async deleteById(tag_id: string): Promise<DeleteResult> {
    this.tags.filter((tag) => tag.id !== tag_id);
    return {
      raw: {},
      affected: 1,
    };
  }

  async listByDescriptionPart(
    description_part: string
  ): Promise<Tag[] | undefined> {
    return this.tags.filter((tag) =>
      tag.description.includes(description_part)
    );
  }

  async list(): Promise<Tag[]> {
    return this.tags.slice();
  }

  async updateById({ tag_id, new_description }: IUpdateTagDTO): Promise<Tag> {
    const tagSelected = this.tags.find((tag) => tag.id === tag_id);
    Object.assign(tagSelected, { description: new_description });

    this.tags = this.tags.filter((tag) => tag.id !== tag_id);
    this.tags.push(tagSelected);

    return tagSelected;
  }
}
