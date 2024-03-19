import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTagUseCase } from './CreateTagUseCase';

export class CreateTagController {
  async create(request: Request, response: Response) {
    const { description, task_id } = request.body;

    const createTagOperation = container.resolve(CreateTagUseCase);

    await createTagOperation.execute({
      description,
      task_id,
    });

    return response.status(201).send();
  }
}
