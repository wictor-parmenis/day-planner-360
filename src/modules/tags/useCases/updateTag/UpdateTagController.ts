import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateTagUseCase } from './UpdateTagUseCase';

export class UpdateTagController {
  async update(request: Request, response: Response) {
    const { new_description } = request.body;
    const { tag_id } = request.params;

    const updateTagOperation = container.resolve(UpdateTagUseCase);

    const updateTag = await updateTagOperation.execute({
      new_description,
      tag_id,
    });

    return response.status(200).send(updateTag);
  }
}
