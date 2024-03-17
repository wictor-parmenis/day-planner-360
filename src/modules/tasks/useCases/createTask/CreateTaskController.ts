import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTaskUseCase } from './CreateTaskUseCase';

export class CreateTaskController {
  async execute(request: Request, response: Response) {
    const { date_execution, description, estimated_duration, title } =
      request.body;

    const createTask = container.resolve(CreateTaskUseCase);

    await createTask.execute({
      date_execution,
      description,
      estimated_duration,
      title,
    });

    return response.status(201).send();
  }
}
