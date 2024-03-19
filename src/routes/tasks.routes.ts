import { CreateTaskController } from '@modules/tasks/useCases/createTask/CreateTaskController';
import { DeleteTaskController } from '@modules/tasks/useCases/deleteTask/DeleteTaskController';
import { ListTasksByTitlePartController } from '@modules/tasks/useCases/listTaskByTitlePart/ListTasksByTitlePartController';
import { ListTasksByIntervalController } from '@modules/tasks/useCases/listTasksByInterval/ListTasksByIntervalController';
import { UpdateTaskController } from '@modules/tasks/useCases/updateTask/UpdateTagController';
import { Router } from 'express';

const tasksRouter = Router();
const createTaskController = new CreateTaskController();
const deleteTaskController = new DeleteTaskController();
const listTasksByTitlePartController = new ListTasksByTitlePartController();
const listTasksByIntervalController = new ListTasksByIntervalController();
const updateTaskController = new UpdateTaskController();

tasksRouter.post('/', createTaskController.create);
tasksRouter.get('/', listTasksByIntervalController.index);
tasksRouter.put('/:task_id', updateTaskController.update);
tasksRouter.delete('/:task_id', deleteTaskController.delete);
tasksRouter.get('/title', listTasksByTitlePartController.index);

export { tasksRouter };
