import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTagsByTaskIdUseCase } from './ListTagsByTaskIdUseCase';

export class ListTagsByIdController {
  async index(request: Request, response: Response) {
    const { task_id } = request.params;
    const listTagByTaskIdOperation = container.resolve(ListTagsByTaskIdUseCase);

    const listTags = await listTagByTaskIdOperation.execute(task_id);

    return response.status(200).send(listTags);
  }
}
