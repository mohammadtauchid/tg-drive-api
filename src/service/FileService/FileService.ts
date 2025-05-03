import { fileBufferSplitter } from '../../utils/fileUtils/fileUtils';

import Config from '../../config/types';
import { ServicesOptions } from './FileService.types';
import { FileRepository } from '../../repositories';
import { TelegramConnector } from '../../connectors';

import { UploadFilePayload } from './FileService.types';

const MEGABYTE = 1024 * 1024;

class FileService {
  config: Config;
  fileRepository: FileRepository;
  telegramConnector: TelegramConnector;

  constructor(options: ServicesOptions) {
    Object.assign(this, options);
  }

  async uploadFile(payload: UploadFilePayload): Promise<Object> {
    const { file } = payload;
    const { chunkSize, chatId } = this.config;

    const splittedFile = fileBufferSplitter(file.data, chunkSize * MEGABYTE);

    const fileIds = await this.telegramConnector.uploadToTelegram(
      splittedFile,
      file.name,
    );

    return await this.fileRepository.save({
      fileIds,
      fileName: file.name,
      fileSize: file.size,
      userId: chatId,
    });
  }
}

export default FileService;
