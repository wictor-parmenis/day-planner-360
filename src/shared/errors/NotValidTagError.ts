import { AppError } from './AppError';

export class NotValidTagError extends AppError {
  constructor() {
    super('One of the listed tags does not exist', 404);
  }
}
