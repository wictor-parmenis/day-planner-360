import 'reflect-metadata';
import { CreateTagUseCase } from './CreateTagUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { Tag } from '@modules/tags/entities/Tag';

let createTagUseCase: CreateTagUseCase;
let inMemoryTagsRepository: InMemoryTagsRepository;

describe('CreateTagUseCase', () => {
  beforeEach(() => {
    inMemoryTagsRepository = new InMemoryTagsRepository();

    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
  });

  it('Should be able create tag.', async () => {
    const createdTag = await createTagUseCase.execute({
      description: 'English',
    });

    expect(createdTag).toHaveProperty('id');
    expect(createdTag.description).toEqual('English');
  });
  it('Should be able not create tag because already exist tag with same description.', async () => {
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'Travel',
      });
    }

    await preConditionsToExecuteTest();

    expect(
      async () =>
        await createTagUseCase.execute({
          description: 'Travel',
        })
    ).rejects.toEqual({
      message: 'Tag with same description already exists.',
      statusCode: 409,
    });
  });
});
