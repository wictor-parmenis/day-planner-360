import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteTagUseCase } from './DeleteTagUseCase';

export class DeleteTagController {
  async delete(request: Request, response: Response) {
    const { tag_id } = request.params;

    const deleteTaskOperation = container.resolve(DeleteTagUseCase);

    await deleteTaskOperation.execute({
      tag_id,
    });

    return response.status(204).send();
  }
}
