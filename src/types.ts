import { TelegramConnector } from './connectors';
import { FileRepository } from './repositories';
import { FileService } from './service';

interface Repositories {
  fileRepository: FileRepository;
}

interface Connectors {
  telegramConnector: TelegramConnector;
}

interface Services {
  fileService: FileService;
}

export { Connectors, Repositories, Services };
