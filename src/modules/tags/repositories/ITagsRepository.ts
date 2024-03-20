import { DeleteResult } from 'typeorm';
import { Tag } from '../entities/Tag';
import { ICreateTagDTO } from '../useCases/createTag/ICreateTagDTO';
import { IUpdateTagDTO } from '../useCases/updateTag/IUpdateTagDTO';

export interface ITagsRepository {
  create: (data: ICreateTagDTO) => Promise<Tag>;
  findById: (tag_id: string) => Promise<Tag | undefined>;
  listByDescriptionPart: (
    description_part: string
  ) => Promise<Tag[] | undefined>;
  updateById: (tag_id: IUpdateTagDTO) => Promise<Tag | undefined>;
  deleteById: (tag_id: string) => Promise<DeleteResult>;
  list: () => Promise<Tag[]>;
}
