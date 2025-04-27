import axios from 'axios';
import FormData from 'form-data';

import Config from '../config/types';
import { UploadFilePayload } from '../routes/file/types';
import { Options } from '../types';

class FileService {
  config: Config;

  constructor(options: Options) {
    Object.assign(this, options);
  }

  // TODO: complete the type return
  async uploadFile(payload: UploadFilePayload) {
    const { file } = payload;
    const { telegramBaseUrl, chatId, botToken } = this.config;

    const uploadedFile = new FormData();
    uploadedFile.append('document', file.data, { filename: file.name });
    uploadedFile.append('chat_id', chatId);

    const { data } = await axios.post(
      `${telegramBaseUrl}/bot${botToken}/sendDocument`,
      uploadedFile,
    );

    return data;
  }
}

export default FileService;
