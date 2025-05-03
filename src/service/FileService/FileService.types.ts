import { UploadedFile } from 'express-fileupload';

import Config from '../../config/types';
import { FileRepository } from '../../repositories';
import { TelegramConnector } from '../../connectors';

interface ServicesOptions {
  config: Config;
  fileRepository: FileRepository;
  telegramConnector: TelegramConnector;
}

interface UploadFilePayload {
  file: UploadedFile;
}

export { ServicesOptions, UploadFilePayload };
