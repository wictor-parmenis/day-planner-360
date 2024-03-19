import { container } from 'tsyringe';

import { TasksRepository } from '@modules/tasks/repositories/TasksRepository';
import { ITasksRepository } from '@modules/tasks/repositories/ITasksRepository';
import { TagsRepository } from '@modules/tags/repositories/TagsRepository';
import { ITagsRepository } from '@modules/tags/repositories/ITagsRepository';

container.registerSingleton<ITasksRepository>(
  'TasksRepository',
  TasksRepository
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
