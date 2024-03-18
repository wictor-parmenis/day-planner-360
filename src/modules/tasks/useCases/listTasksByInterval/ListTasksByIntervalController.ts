import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListTasksByIntervalUseCase } from './ListTasksByIntervalUseCase';

export class ListTasksByIntervalController {
  async index(request: Request, response: Response) {
    const final_date = request.query.final_date as unknown as Date;
    const initial_date = request.query.initial_date as unknown as Date;

    const listTasksByInterval = container.resolve(ListTasksByIntervalUseCase);

    const listTasks = await listTasksByInterval.execute({
      final_date,
      initial_date,
    });

    return response.status(200).json(listTasks);
  }
}
