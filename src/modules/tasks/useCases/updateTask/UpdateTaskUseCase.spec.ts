import 'reflect-metadata';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTaskUseCase } from '../createTask/CreateTaskUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { CreateTagUseCase } from '@modules/tags/useCases/createTag/CreateTagUseCase';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';
import { Task } from '@modules/tasks/entities/Task';
import { ListTasksByTitlePartUseCase } from '../listTaskByTitlePart/ListTasksByTitlePartUseCase';
import { Tag } from '@modules/tags/entities/Tag';

let createTaskUseCase: CreateTaskUseCase;
let createTagUseCase: CreateTagUseCase;
let updateTaskUseCase: UpdateTaskUseCase;
let listTasksByTitlePartUseCase: ListTasksByTitlePartUseCase;
let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;

describe('UpdateTaskUseCase', () => {
  beforeEach(() => {
    inMemoryTasksRepository = new InMemoryTasksRepository();
    inMemoryTagsRepository = new InMemoryTagsRepository();
    createTaskUseCase = new CreateTaskUseCase(
      inMemoryTasksRepository,
      inMemoryTagsRepository
    );
    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    updateTaskUseCase = new UpdateTaskUseCase(
      inMemoryTasksRepository,
      inMemoryTagsRepository
    );
    listTasksByTitlePartUseCase = new ListTasksByTitlePartUseCase(
      inMemoryTasksRepository
    );
  });

  it('Should be able update task.', async () => {
    let taskCreated = {} as Task;
    async function preConditionsToExecuteTest() {
      taskCreated = await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras [EUA].',
        estimated_duration: 7200000,
        tags_ids: [],
      });
    }

    await preConditionsToExecuteTest();

    const updatedTask = await updateTaskUseCase.execute({
      task_id: taskCreated.id,
      title: 'Spanish class',
      date_execution: '2024-03-25T20:00:00.000Z',
      description: 'Alcançar metas estrangeiras [Argentina].',
      estimated_duration: 7200000,
      tags_ids: [],
    });

    expect(updatedTask).toHaveProperty('id');
    expect(updatedTask.id).toEqual(taskCreated.id);
    expect(updatedTask.title).toEqual('Spanish class');
    expect(updatedTask.date_execution).toEqual('2024-03-25T20:00:00.000Z');
    expect(updatedTask.description).toEqual(
      'Alcançar metas estrangeiras [Argentina].'
    );
  });
  it('Should not be able update task because task not exist.', async () => {
    expect(async () => {
      await updateTaskUseCase.execute({
        task_id: '6b8a6e99-0976-410e-9fbd-098b1d5e6708',
        title: 'Spanish class',
        date_execution: '2024-03-25T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras [Argentina].',
        estimated_duration: 7200000,
        tags_ids: [],
      });
    }).rejects.toEqual({
      message: 'Task not exist.',
      statusCode: 404,
    });
  });

  // todo: resolve this test
  it.skip('Should not be able update tags of task because tags not exist.', async () => {
    let taskCreated = {} as Task;
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      taskCreated = await createTaskUseCase.execute({
        title: 'English',
        date_execution: '2024-03-24T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras [EUA].',
        estimated_duration: 7200000,
        tags_ids: [],
      });

      tagCreated = await createTagUseCase.execute({
        description: 'Travel',
      });
    }

    await preConditionsToExecuteTest();

    expect(async () => {
      await updateTaskUseCase.execute({
        task_id: '6b8a6e99-0976-410e-9fbd-098b1d5e6708',
        title: 'Spanish class',
        date_execution: '2024-03-25T20:00:00.000Z',
        description: 'Alcançar metas estrangeiras [Argentina].',
        estimated_duration: 7200000,
        tags_ids: [],
      });
    }).rejects.toEqual({
      message: 'Task not exist.',
      statusCode: 404,
    });
  });
});
