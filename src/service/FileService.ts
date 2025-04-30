import axios from 'axios';
import FormData from 'form-data';

import { fileBufferSplitter } from '../utils/fileUtils/fileUtils';

import Config from '../config/types';
import { UploadFilePayload } from '../routes/file/types';
import { ServicesOptions } from '../types';
import { FileRepository } from '../repositories';

const MEGABYTE = 1024 * 1024;

class FileService {
  config: Config;
  fileRepository: FileRepository;

  constructor(options: ServicesOptions) {
    Object.assign(this, options);
  }

  async uploadFile(payload: UploadFilePayload): Promise<Object> {
    const { file } = payload;
    const { chunkSize, chatId } = this.config;

    const splittedFile = fileBufferSplitter(file.data, chunkSize * MEGABYTE);

    const files = await this.uploadToTelegram(splittedFile, file.name);

    const result = await this.fileRepository.insertFile({
      files,
      fileName: file.name,
      fileSize: file.size,
      userId: chatId,
    });

    return result;
  }

  async uploadToTelegram(fileBuffers: Array<Buffer>, filename: string) {
    const { telegramBaseUrl, botToken, chatId } = this.config;

    const result = await Promise.all(
      fileBuffers.map(async (buffer: Buffer, index: number) => {
        const uploadedFile = new FormData();

        uploadedFile.append('document', buffer, {
          filename: `${filename}.chunk${index}`,
        });
        uploadedFile.append('chat_id', chatId);

        const { data } = await axios.post(
          `${telegramBaseUrl}/bot${botToken}/sendDocument`,
          uploadedFile,
        );

        return data;
      }),
    );

    return result;
  }
}

export default FileService;
