import axios from 'axios';
import FormData from 'form-data';

import Config from '../../config/types';

import { TelegramConnectorOptions } from './TelegramConnector.types';

class TelegramConnector {
  config: Config;

  constructor(options: TelegramConnectorOptions) {
    Object.assign(this, options);
  }

  async uploadToTelegram(
    fileBuffers: Array<Buffer>,
    filename: string,
  ): Promise<string[]> {
    const { telegramBaseUrl, botToken, chatId } = this.config;

    return await Promise.all(
      fileBuffers.map(async (buffer: Buffer, index: number) => {
        const uploadedFile = new FormData();

        uploadedFile.append('document', buffer, {
          filename: `${filename}.chunk${index}`,
        });
        uploadedFile.append('chat_id', chatId);

        const {
          data: {
            result: {
              document: { file_id },
            },
          },
        } = await axios.post(
          `${telegramBaseUrl}/bot${botToken}/sendDocument`,
          uploadedFile,
        );

        return file_id;
      }),
    );
  }
}

export default TelegramConnector;
