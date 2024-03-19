import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTaskUseCase } from './UpdateTaskUseCase';

export class UpdateTaskController {
  async update(request: Request, response: Response) {
    const { date_execution, description, estimated_duration, tags_ids, title } =
      request.body;
    const { task_id } = request.params;

    const updateTaskOperation = container.resolve(UpdateTaskUseCase);

    const updatedTask = await updateTaskOperation.execute({
      date_execution,
      description,
      estimated_duration,
      tags_ids,
      task_id,
      title,
    });

    return response.status(200).send(updatedTask);
  }
}
