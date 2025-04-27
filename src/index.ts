import express from 'express';

import fileUpload from 'express-fileupload';

import config from './config';
import { file } from './routes';
import { FileService } from './service';
import { errorHandler } from './middlewares';

import { Services } from './types';

const app = express();

app.use(express.json());
app.use(fileUpload());

const createService = (): Services => ({
  fileService: new FileService({ config }),
});

const initializeDependencies = () => {
  app.locals.service = createService();
};

const main = (): void => {
  initializeDependencies();
  app.use(file);
};

main();

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`server is running on port ${config.port}`);
});
