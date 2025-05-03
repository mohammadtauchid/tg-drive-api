import express from 'express';
import fileUpload from 'express-fileupload';

import MongoModels from 'mongo-models';

import config from './config';
import { errorHandler } from './middlewares';

import { TelegramConnector } from './connectors';
import { File } from './models';
import { FileRepository } from './repositories';
import { file } from './routes';
import { FileService } from './service';

import { Connectors, Repositories, Services } from './types';

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

const createRepository = async (): Promise<Repositories> => {
  const { File } = await createModel();

  return { fileRepository: new FileRepository({ db: File }) };
};

const createConnectors = (): Connectors => {
  return {
    telegramConnector: new TelegramConnector({ config }),
  };
};

const createService = async (): Promise<Services> => {
  const { fileRepository } = await createRepository();
  const { telegramConnector } = createConnectors();

  return {
    fileService: new FileService({
      config,
      fileRepository,
      telegramConnector,
    }),
  };
};

const initializeDependencies = async (): Promise<void> => {
  app.locals.service = await createService();
};

const main = async (): Promise<void> => {
  await initializeDependencies();

  app.use(file);

  await app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
  });

  app.use(errorHandler);
};

main();
