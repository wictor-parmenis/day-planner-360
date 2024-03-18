import { DeleteResult } from 'typeorm';
import { Tag } from '../entities/Tag';

export interface ICreateTagDTO {
  task_id: string;
  description: string;
}

export interface IUpdateTagDTO {
  tag: Tag;
  new_description: string;
}

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
