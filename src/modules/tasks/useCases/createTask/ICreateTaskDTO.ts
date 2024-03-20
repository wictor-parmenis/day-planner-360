import { Tag } from '@modules/tags/entities/Tag';

export interface ICreateTaskDTO {
  title: string;
  description: string;
  estimated_duration: number;
  date_execution: string;
  tags_ids: string[];
}

export interface ICreateTaskRepositoryDTO {
  title: string;
  description: string;
  estimated_duration: number;
  date_execution: string;
  tags: Tag[];
}
