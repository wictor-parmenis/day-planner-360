import { CreateTagController } from '@modules/tags/useCases/createTag/CreateTaskController';
import { DeleteTagController } from '@modules/tags/useCases/deleteTag/DeleteTagController';
import { ListTagsController } from '@modules/tags/useCases/listTags/ListTagsController';
import { ListTagsByIdController } from '@modules/tags/useCases/listTagsByTaskId/ListTagsByIdController';
import { UpdateTagController } from '@modules/tags/useCases/updateTag/UpdateTagController';
import { Router } from 'express';

const tagsRouter = Router();
const createTagController = new CreateTagController();
const deleteTagController = new DeleteTagController();
const updateTagController = new UpdateTagController();
const listTagsController = new ListTagsController();
const listTagsByIdController = new ListTagsByIdController();

tagsRouter.post('/', createTagController.create);
tagsRouter.get('/', listTagsController.index);
tagsRouter.put('/:tag_id', updateTagController.update);
tagsRouter.delete('/:tag_id', deleteTagController.delete);
tagsRouter.get('/list-by-task/:task_id', listTagsByIdController.index);

export { tagsRouter };
