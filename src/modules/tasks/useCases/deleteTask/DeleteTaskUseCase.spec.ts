import 'reflect-metadata';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { CreateTagUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';
import { Task } from '@modules/tasks/entities/Task';
import { ListTasksByTitlePartUseCase } from '../listTaskByTitlePart/ListTasksByTitlePartUseCase';

let createTaskUseCase: CreateTaskUseCase;
let createTagUseCase: CreateTagUseCase;
let deleteTaskUseCase: DeleteTaskUseCase;
let listTasksByTitlePartUseCase: ListTasksByTitlePartUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;

describe('DeleteTaskUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTaskUseCase = new CreateTaskUseCase(
      inMemoryTasksRepository,
      inMemoryTagsRepository
    );
    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    deleteTaskUseCase = new DeleteTaskUseCase(inMemoryTasksRepository);
    listTasksByTitlePartUseCase = new ListTasksByTitlePartUseCase(
      inMemoryTasksRepository
    );
  });

  it('Should be able delete task.', async () => {
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

    await deleteTaskUseCase.execute({ task_id: taskCreated.id });

    const tasks = await listTasksByTitlePartUseCase.execute({
      title_part: taskCreated.title,
    });

    expect(tasks).toEqual([]);
  });
  it('Should not be able delete task because task not exist.', async () => {
    expect(async () => {
      await deleteTaskUseCase.execute({ task_id: '123123' });
    }).rejects.toEqual({
      message: 'Task not exist.',
      statusCode: 404,
    });
  });
});
