import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTagsUseCase } from './ListTagsUseCase';

export class ListTagsController {
  async index(_request: Request, response: Response) {
    const listTagOperation = container.resolve(ListTagsUseCase);

    const listTags = await listTagOperation.execute();

    return response.status(200).send(listTags);
  }
}
