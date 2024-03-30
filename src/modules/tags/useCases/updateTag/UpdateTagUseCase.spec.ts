import 'reflect-metadata';
import { UpdateTagUseCase } from './UpdateTagUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { Tag } from '@modules/tags/entities/Tag';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTagUseCase } from '../createTag/CreateTagUseCase';
import { Task } from '@modules/tasks/entities/Task';

let updateTagsUseCase: UpdateTagUseCase;
let createTagUseCase: CreateTagUseCase;

let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;
describe('UpdateTagUseCase', () => {
  beforeEach(() => {
    inMemoryTagsRepository = new InMemoryTagsRepository();
    inMemoryTasksRepository = new InMemoryTasksRepository();

    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    updateTagsUseCase = new UpdateTagUseCase(inMemoryTagsRepository);
  });

  it('Should be able update description of tag.', async () => {
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'Travel',
      });
    }

    await preConditionsToExecuteTest();

    const updatedTag = await updateTagsUseCase.execute({
      new_description: 'Spanish',
      tag_id: tagCreated.id,
    });

    expect(updatedTag).toHaveProperty('id');
    expect(updatedTag.description).toEqual('Spanish');
  });

  it('Should not be able update tag because tag does not exist.', async () => {
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'Travel',
      });
    }

    await preConditionsToExecuteTest();

    expect(async () => {
      await updateTagsUseCase.execute({
        new_description: 'Spanish',
        tag_id: '6b8a6e99-0976-410e-9fbd-098b1d5e6708',
      });
    }).rejects.toEqual({
      message: 'Tag not exist.',
      statusCode: 404,
    });
  });
});
