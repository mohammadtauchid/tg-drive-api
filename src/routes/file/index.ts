import { Router } from 'express';

import { createHandler } from '../../utils';
import schemaValidation from '../../middlewares/schemaValidation/schemaValidation';

import { uploadFileHandler } from './handler';
import { uploadFileSchema } from './schema';

const router = Router();

router.post(
  '/files',
  schemaValidation(uploadFileSchema),
  createHandler(uploadFileHandler),
);

export default router;
