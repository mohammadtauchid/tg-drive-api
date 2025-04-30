import dotenv from 'dotenv';

import Config from './types';

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT),
  botToken: String(process.env.BOT_TOKEN),
  chatId: String(process.env.CHAT_ID),
  telegramBaseUrl: String(process.env.TELEGRAM_BASE_URL),
  chunkSize: Number(process.env.CHUNK_SIZE),
  databaseURL: String(process.env.MONGODB_URL),
  databaseName: String(process.env.MONGODB_NAME),
};

export default config;
