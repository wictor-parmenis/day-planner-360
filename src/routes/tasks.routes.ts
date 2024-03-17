import { CreateTaskController } from '@modules/tasks/useCases/createTask/CreateTaskController';
import { DeleteTaskController } from '@modules/tasks/useCases/deleteTask/CreateTaskController';
import { Router } from 'express';

const tasksRouter = Router();
const createTaskController = new CreateTaskController();
const deleteTaskController = new DeleteTaskController();

tasksRouter.post('/', createTaskController.execute);
tasksRouter.delete('/:task_id', deleteTaskController.delete);

export { tasksRouter };
