import 'reflect-metadata';
import { ListTagsUseCase } from './ListTagsUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { Tag } from '@modules/tags/entities/Tag';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTagUseCase } from '../createTag/CreateTagUseCase';

let listTagsUseCase: ListTagsUseCase;
let createTagUseCase: CreateTagUseCase;

let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;
describe('ListTagsUseCase', () => {
  beforeEach(() => {
    inMemoryTagsRepository = new InMemoryTagsRepository();
    inMemoryTasksRepository = new InMemoryTasksRepository();

    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    listTagsUseCase = new ListTagsUseCase(inMemoryTagsRepository);
  });

  it('Should be able list all tags.', async () => {
    async function preConditionsToExecuteTest() {
      await createTagUseCase.execute({
        description: 'Travel',
      });
      await createTagUseCase.execute({
        description: 'English',
      });
    }

    await preConditionsToExecuteTest();

    const listTags = await listTagsUseCase.execute();

    expect(listTags).toHaveLength(2);
  });
});
