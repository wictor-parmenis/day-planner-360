import 'reflect-metadata';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { CreateTagUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';
import { Task } from '@modules/tasks/entities/Task';
import { ListTasksByTitlePartUseCase } from './ListTasksByTitlePartUseCase';

let createTaskUseCase: CreateTaskUseCase;
let createTagUseCase: CreateTagUseCase;
let listTasksByTitlePartUseCase: ListTasksByTitlePartUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;

describe('ListTasksByTitlePartUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTaskUseCase = new CreateTaskUseCase(
      inMemoryTasksRepository,
      inMemoryTagsRepository
    );
    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    listTasksByTitlePartUseCase = new ListTasksByTitlePartUseCase(
      inMemoryTasksRepository
    );
  });

  it('Should be able find task with same title part.', async () => {
    let taskCreated = {} as Task;
    async function preConditionsToExecuteTest() {
      taskCreated = await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras.',
        estimated_duration: 7200000,
        tags_ids: [],
      });
    }

    await preConditionsToExecuteTest();

    const tasks = await listTasksByTitlePartUseCase.execute({
      title_part: taskCreated.title,
    });

    expect(tasks[0]).toHaveProperty('id');
    expect(tasks[0].title).toEqual(taskCreated.title);
  });
  it('Should be able return avoid data because any task was found.', async () => {
    const tasks = await listTasksByTitlePartUseCase.execute({
      title_part: 'English',
    });

    expect(tasks).toEqual([]);
  });
});
