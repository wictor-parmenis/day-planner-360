import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
  async create(request: Request, response: Response) {
    const { date_execution, description, estimated_duration, title, tags_ids } =
      request.body;

    const createTaskOperation = container.resolve(CreateTaskUseCase);

    await createTaskOperation.execute({
      date_execution,
      description,
      estimated_duration,
      title,
      tags_ids,
    });

    return response.status(201).send();
  }
}
