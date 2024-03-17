import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTaskUseCase } from './DeleteTaskUseCase';

export class DeleteTaskController {
  async delete(request: Request, response: Response) {
    const { task_id } = request.params;

    const createTask = container.resolve(DeleteTaskUseCase);

    await createTask.execute({
      task_id,
    });

    return response.status(201).send();
  }
}
