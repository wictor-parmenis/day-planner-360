import 'reflect-metadata';
import { DeleteTagUseCase } from './DeleteTagUseCase';
import { InMemoryTagsRepository } from '@modules/tags/repositories/in-memory/inMemoryTagsRepository';
import { Tag } from '@modules/tags/entities/Tag';
import { InMemoryTasksRepository } from '@modules/tasks/repositories/in-memory/InMemoryTasksRepository';
import { CreateTagUseCase } from '../createTag/CreateTagUseCase';

let deleteTagUseCase: DeleteTagUseCase;
let createTagUseCase: CreateTagUseCase;

let inMemoryTasksRepository: InMemoryTasksRepository;
let inMemoryTagsRepository: InMemoryTagsRepository;
describe('DeleteTagUseCase', () => {
  beforeEach(() => {
    inMemoryTagsRepository = new InMemoryTagsRepository();
    inMemoryTasksRepository = new InMemoryTasksRepository();

    createTagUseCase = new CreateTagUseCase(inMemoryTagsRepository);
    deleteTagUseCase = new DeleteTagUseCase(
      inMemoryTagsRepository,
      inMemoryTasksRepository
    );
  });

  it('Should be able delete tag.', async () => {
    let tagCreated = {} as Tag;

    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'Travel',
      });
    }

    await preConditionsToExecuteTest();

    const deletedTag = await deleteTagUseCase.execute({
      tag_id: tagCreated.id,
    });

    expect(deletedTag).toHaveProperty('raw');
  });
  it('Should be able not delete tag because tag does not exist.', async () => {
    let tagCreated = {} as Tag;
    async function preConditionsToExecuteTest() {
      tagCreated = await createTagUseCase.execute({
        description: 'Travel',
      });
    }

    await preConditionsToExecuteTest();

    expect(
      async () =>
        await deleteTagUseCase.execute({
          tag_id: '6b8a6e99-0976-410e-9fbd-098b1d5e6708',
        })
    ).rejects.toEqual({
      message: 'Tag not exist.',
      statusCode: 404,
    });
  });

  // todo: should be able delete tag and delete tag with Task entity association.
});
