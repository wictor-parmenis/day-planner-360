import 'reflect-metadata';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTaskUseCase } from './CreateTaskUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { Tag } from '@modules/tags/entities/Tag';
import { CreateTagUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';
import { Task } from '@modules/tasks/entities/Task';

let createTaskUseCase: CreateTaskUseCase;
let createTagUseCase: CreateTagUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;

describe('CreateTaskUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTaskUseCase = new CreateTaskUseCase(
      inMemoryTasksRepository,
      inMemoryTagsRepository
    );
    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
  });

  it('Should be able create task without tags.', async () => {
    const createdTask = await createTaskUseCase.execute({
      title: 'English',
      date_execution: '2024-03-24T20:00:00.000Z',
      description: 'Alcançar metas estrangeiras.',
      estimated_duration: 7200000,
      tags_ids: [],
    });

    expect(createdTask).toHaveProperty('id');
    expect(createdTask.date_execution).toEqual('2024-03-24T20:00:00.000Z');
  });
  it('Should be able create task with tags.', async () => {
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'travel',
      });
    }

    await preConditionsToExecuteTest();

    const createdTask = await createTaskUseCase.execute({
      title: 'English',
      date_execution: '2024-03-24T20:00:00.000Z',
      description: 'Alcançar metas estrangeiras.',
      estimated_duration: 7200000,
      tags_ids: [tagCreated.id],
    });

    expect(createdTask).toHaveProperty('id');
    expect(createdTask.tags[0]).toHaveProperty('id');
  });
  it('Should be not create task if task with same execution date already exist.', async () => {
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

    expect(async () => {
      await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras.',
        estimated_duration: 7200000,
        tags_ids: [],
      });
    }).rejects.toEqual({
      message: 'There is already a task scheduled for that time.',
      statusCode: 400,
    });
  });
  it('Should be not create task if task has more of 10 tags.', async () => {
    const idOfTags: string[] = [
      'eb0b2de1-71bc-4e18-9e1d-17d09fca0c11',
      'e9f44084-0f79-47a4-aa92-6a3ec5c7db72',
      '9a4f23e0-0ed3-4f7c-bc79-fc6c8b5dc80b',
      'ba30430c-dab9-4830-a01b-6e615a3027f3',
      'c84dc2cf-76a3-46e4-baa4-1d6c7755c34e',
      '6c63f424-e075-4d7e-8a79-949583e16bc3',
      'a6eb2f80-0458-48a0-b168-3b0e15bba6a7',
      '7f18ac81-1ba0-46ec-8a82-8ac5cc8fc396',
      'f1d6a5f2-1f86-4f8b-a123-99e84f68ef73',
      'fd61cb4d-05e2-446d-884b-22b15cfe1e76',
      'a6eb2f80-0458-48a0-b168-3b0e15bba6a7',
    ];

    expect(async () => {
      await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras.',
        estimated_duration: 7200000,
        tags_ids: idOfTags,
      });
    }).rejects.toEqual({
      message: 'The limit of tags attached to the task has been exceeded.',
      statusCode: 400,
    });
  });
});
