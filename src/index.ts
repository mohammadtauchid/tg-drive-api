import express from 'express';

import config from './config';
import { errorHandler } from './middlewares';

const app = express();

app.use(express.json());

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
