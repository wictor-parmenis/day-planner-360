import { Router } from 'express';

import { tasksRouter } from './tasks.routes';
import { tagsRouter } from './tags.routes';

const router = Router();

router.use('/tasks', tasksRouter);
router.use('/tags', tagsRouter);

export { router };
