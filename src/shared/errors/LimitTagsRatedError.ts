import { AppError } from './AppError';

export class LimitTagsRatedError extends AppError {
  constructor() {
    super('limit of created tags already reached.', 403);
  }
}
