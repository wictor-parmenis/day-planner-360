import { Tag } from '@modules/tags/entities/Tag';

export interface IUpdateTaskDTO {
  task_id: string;
  title: string;
  description: string;
  date_execution: string;
  estimated_duration: number;
  tags_ids: string[];
}

export interface IUpdateTaskRepositoryDTO {
  task_id: string;
  title: string;
  description: string;
  date_execution: string;
  estimated_duration: number;
  tags_ids: string[];
}
