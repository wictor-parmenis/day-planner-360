import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

export class DeleteTaskController {
  async delete(request: Request, response: Response) {
    const { task_id } = request.params;

    const deleteTask = container.resolve(DeleteTaskUseCase);

    await deleteTask.execute({
      task_id,
    });

    return response.status(204).send();
  }
}
