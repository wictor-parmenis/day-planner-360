import 'reflect-metadata';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { CreateTagUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';
import { Task } from '@modules/tasks/entities/Task';
import { ListTasksByTagsUseCase } from './ListTasksByTagsUseCase';
import { Tag } from '@modules/tags/entities/Tag';

let createTaskUseCase: CreateTaskUseCase;
let createTagUseCase: CreateTagUseCase;
let listTasksByTagsUseCase: ListTasksByTagsUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;

// todo: resolve this test

describe.skip('ListTasksByTagsUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTaskUseCase = new CreateTaskUseCase(
      inMemoryTasksRepository,
      inMemoryTagsRepository
    );
    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    listTasksByTagsUseCase = new ListTasksByTagsUseCase(
      inMemoryTasksRepository
    );
  });

  it('Should be able find 1 task with tags associated.', async () => {
    let tagCreated = {} as Tag;
    let taskCreated = {} as Task;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'English',
      });
      taskCreated = await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras.',
        estimated_duration: 7200000,
        tags_ids: [tagCreated.id],
      });
    }

    await preConditionsToExecuteTest();

    const tasks = await listTasksByTagsUseCase.execute({
      tags_ids: [tagCreated.id],
    });

    expect(tasks[0]).toHaveProperty('id');
    expect(tasks[0].title).toEqual(taskCreated.title);
  });
  it('Should be able to return empty data because it didn"t find any tasks.', async () => {
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'English',
      });
      await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras.',
        estimated_duration: 7200000,
        tags_ids: [tagCreated.id],
      });
    }

    await preConditionsToExecuteTest();

    const tasks = await listTasksByTagsUseCase.execute({
      tags_ids: ['ed977777-dfcf-4207-9d69-f87972e52c4a'],
    });

    expect(tasks).toEqual([]);
  });

  it('Should be able to return empty data if arg tags_ids is empty.', async () => {
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'English',
      });
      await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras.',
        estimated_duration: 7200000,
        tags_ids: [tagCreated.id],
      });
    }

    await preConditionsToExecuteTest();

    const tasks = await listTasksByTagsUseCase.execute({
      tags_ids: [],
    });

    expect(tasks).toEqual([]);
  });
});
