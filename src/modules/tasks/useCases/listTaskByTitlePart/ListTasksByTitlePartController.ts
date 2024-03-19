import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTasksByTitlePartUseCase } from './ListTasksByTitlePartUseCase';

export class ListTasksByTitlePartController {
  async index(request: Request, response: Response) {
    const title_part = request.query.title_part as string;

    const listByTitlePartOperation = container.resolve(
      ListTasksByTitlePartUseCase
    );

    const listTasks = await listByTitlePartOperation.execute({
      title_part,
    });

    return response.status(200).json(listTasks);
  }
}
