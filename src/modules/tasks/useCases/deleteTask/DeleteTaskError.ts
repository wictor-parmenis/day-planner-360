import { AppError } from '../../../../shared/errors/AppError';

export class DeleteTaskError extends AppError {
  constructor() {
    super('Task not exist.');
  }
}
