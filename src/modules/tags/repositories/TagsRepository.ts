import { DeleteResult, getRepository, Repository } from 'typeorm';
import {
  ICreateTagDTO,
  ITagsRepository,
  IUpdateTagDTO,
} from './ITagsRepository';
import { Tag } from '../entities/Tag';

export class TagsRepository implements ITagsRepository {
  private repository: Repository<Tag>;

  constructor() {
    this.repository = getRepository(Tag);
  }

  async listByDescriptionPart(
    description_part: string
  ): Promise<Tag[] | undefined> {
    return this.repository
      .createQueryBuilder('tags')
      .where('tasks.description LIKE :text', { text: `%${description_part}%` })
      .getMany();
  }

  async findById(task_id: string): Promise<Tag | undefined> {
    return this.repository.findOne(task_id);
  }

  async create({ description, task_id }: ICreateTagDTO): Promise<Tag> {
    const tag = this.repository.create({
      description,
      task_id,
    });

    return this.repository.save(tag);
  }

  async deleteById(tag_id: string): Promise<DeleteResult> {
    return this.repository.delete(tag_id);
  }
  async list(): Promise<Tag[]> {
    return this.repository.find();
  }
  async updateById({ tag, new_description }: IUpdateTagDTO): Promise<Tag> {
    Object.assign(tag, { description: new_description });

    return this.repository.save(tag);
  }
}
