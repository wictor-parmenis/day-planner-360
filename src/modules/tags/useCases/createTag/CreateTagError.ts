import { AppError } from '../../../../shared/errors/AppError';

export class CreateTagWithSameDescriptionError extends AppError {
  constructor() {
    super('Tag with same description already exists.', 409);
  }
}
