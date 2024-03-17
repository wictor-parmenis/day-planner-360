import { AppError } from '../../../../shared/errors/AppError';

export class CreateTaskError extends AppError {
  constructor() {
    super('There is already a task scheduled for that time.');
  }
}
