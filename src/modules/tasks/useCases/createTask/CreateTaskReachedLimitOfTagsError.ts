import { AppError } from '../../../../shared/errors/AppError';

export class CreateTaskReachedLimitOfTagsError extends AppError {
  constructor() {
    super('The limit of tags attached to the task has been exceeded.');
  }
}
