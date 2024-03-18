import { CreateTaskController } from '@modules/tasks/useCases/createTask/CreateTaskController';
import { DeleteTaskController } from '@modules/tasks/useCases/deleteTask/DeleteTaskController';
import { ListTasksByTitlePartController } from '@modules/tasks/useCases/listTaskByTitlePart/ListTasksByTitlePartController';
import { ListTasksByIntervalController } from '@modules/tasks/useCases/listTasksByInterval/ListTasksByIntervalController';
import { Router } from 'express';

const tasksRouter = Router();
const createTaskController = new CreateTaskController();
const deleteTaskController = new DeleteTaskController();
const listTasksByTitlePartController = new ListTasksByTitlePartController();
const listTasksByIntervalController = new ListTasksByIntervalController();

tasksRouter.post('/', createTaskController.execute);
tasksRouter.get('/', listTasksByIntervalController.index);
tasksRouter.delete('/:task_id', deleteTaskController.delete);
tasksRouter.get('/title', listTasksByTitlePartController.index);

export { tasksRouter };
