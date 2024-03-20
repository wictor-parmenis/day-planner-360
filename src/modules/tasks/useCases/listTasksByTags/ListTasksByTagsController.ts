import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTasksByTagsUseCase } from './ListTasksByTagsUseCase';

export class ListTasksByTagsController {
  async index(request: Request, response: Response) {
    const tags_ids = request.body;

    const listTasksByTagsOperation = container.resolve(ListTasksByTagsUseCase);

    const listTasks = await listTasksByTagsOperation.execute(tags_ids);

    return response.status(200).json(listTasks);
  }
}
