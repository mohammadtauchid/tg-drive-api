import Config from './config/types';
import { FileService } from './service';

interface Services {
  fileService: FileService;
}

interface Options {
  config?: Config
}

export { Services, Options };
