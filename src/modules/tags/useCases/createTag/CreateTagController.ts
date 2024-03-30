import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateTagUseCase } from './CreateTagUseCase';

export class CreateTagController {
  async create(request: Request, response: Response) {
    const { description } = request.body;

    const createTagOperation = container.resolve(CreateTagUseCase);

    await createTagOperation.execute({
      description,
    });

    return response.status(201).send();
  }
}
