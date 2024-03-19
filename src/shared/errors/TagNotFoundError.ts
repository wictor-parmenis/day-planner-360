import { AppError } from './AppError';

export class TagNotFoundError extends AppError {
  constructor() {
    super('Tag not exist.', 404);
  }
}
