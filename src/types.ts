import Config from './config/types';
import { FileRepository } from './repositories';
import { FileService } from './service';

interface Repositories {
  fileRepository?: FileRepository
}

interface Services {
  fileService: FileService;
}

interface ServicesOptions extends Repositories {
  config?: Config;
  
}

export { Services, ServicesOptions };
