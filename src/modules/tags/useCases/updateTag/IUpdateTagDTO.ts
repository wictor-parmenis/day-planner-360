import { Tag } from '@modules/tags/entities/Tag';

export interface IUpdateTagDTO {
  tag_id: string;
  new_description: string;
}
