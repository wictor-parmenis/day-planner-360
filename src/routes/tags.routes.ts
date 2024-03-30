import { CreateTagController } from '@modules/tags/useCases/createTag/CreateTagController';
import { DeleteTagController } from '@modules/tags/useCases/deleteTag/DeleteTagController';
import { ListTagsController } from '@modules/tags/useCases/listTags/ListTagsController';
import { UpdateTagController } from '@modules/tags/useCases/updateTag/UpdateTagController';
import { Router } from 'express';

const tagsRouter = Router();
const createTagController = new CreateTagController();
const deleteTagController = new DeleteTagController();
const updateTagController = new UpdateTagController();
const listTagsController = new ListTagsController();

tagsRouter.post('/', createTagController.create);
tagsRouter.get('/', listTagsController.index);
tagsRouter.patch('/:tag_id', updateTagController.update);
tagsRouter.delete('/:tag_id', deleteTagController.delete);

export { tagsRouter };
