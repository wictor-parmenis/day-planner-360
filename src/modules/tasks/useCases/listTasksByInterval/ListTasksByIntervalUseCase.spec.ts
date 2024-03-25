import 'reflect-metadata';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { CreateTagUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';
import { Task } from '@modules/tasks/entities/Task';
import { ListTasksByIntervalUseCase } from './ListTasksByIntervalUseCase';

let createTaskUseCase: CreateTaskUseCase;
let createTagUseCase: CreateTagUseCase;
let listTasksByIntervalUseCase: ListTasksByIntervalUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;

describe('ListTasksByIntervalUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTaskUseCase = new CreateTaskUseCase(
      inMemoryTasksRepository,
      inMemoryTagsRepository
    );
    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    listTasksByIntervalUseCase = new ListTasksByIntervalUseCase(
      inMemoryTasksRepository
    );
  });

  it('Should be able find task.', async () => {
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

    const tasks = await listTasksByIntervalUseCase.execute({
      initial_date: new Date(2024, 2, 20),
      final_date: new Date(2024, 3, 30),
    });

    expect(tasks[0]).toHaveProperty('id');
    expect(tasks[0].title).toEqual(taskCreated.title);
  });
  it('Should be able to return empty data because it didn"t find any tasks.', async () => {
    const tasks = await listTasksByIntervalUseCase.execute({
      initial_date: new Date(2024, 2, 20),
      final_date: new Date(2024, 3, 30),
    });

    expect(tasks).toEqual([]);
  });
});
