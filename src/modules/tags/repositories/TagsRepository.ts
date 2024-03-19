import { DeleteResult, getRepository, Repository } from 'typeorm';
import { ITagsRepository } from './ITagsRepository';
import { Tag } from '../entities/Tag';
import { ICreateTagDTO } from '../useCases/createTag/ICreateTagDTO';
import { IUpdateTagDTO } from '../useCases/updateTag/IUpdateTagDTO';

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

  async findById(tag_id: string): Promise<Tag | undefined> {
    return this.repository.findOne(tag_id);
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
  async updateById({ tag_id, new_description }: IUpdateTagDTO): Promise<Tag> {
    const tagSelected = await this.repository.findOne(tag_id);
    Object.assign(tagSelected, { description: new_description });

    return this.repository.save(tagSelected);
  }
  findByTaskId(task_id: string): Promise<Tag[]> {
    return this.repository.find({ where: { task_id } });
  }
}
