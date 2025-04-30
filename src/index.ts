import express from 'express';
import fileUpload from 'express-fileupload';

// @ts-ignore
import MongoModels from 'mongo-models';

import config from './config';
import { File } from './models';
import { FileRepository } from './repositories';
import { file } from './routes';
import { FileService } from './service';
import { errorHandler } from './middlewares';

import { Services } from './types';

const app = express();

app.use(express.json());
app.use(fileUpload());

const createModel = async () => {
  await MongoModels.connect({
    uri: config.databaseURL,
    db: config.databaseName,
  });

  return {
    File,
  };
};

const createRepository = async () => {
  const { File } = await createModel();

  return { fileRepository: new FileRepository({ db: File }) };
};

const createService = async (): Promise<Services> => {
  const { fileRepository } = await createRepository();

  return {
    fileService: new FileService({ config, fileRepository }),
  };
};

const initializeDependencies = async (): Promise<void> => {
  app.locals.service = await createService();
};

const main = async (): Promise<void> => {
  initializeDependencies();

  app.use(file);

  await app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
  });
};

main();

app.use(errorHandler);
