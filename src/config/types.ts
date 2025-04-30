interface Config {
  port: number;
  botToken: string;
  chatId: string;
  telegramBaseUrl: string;
  chunkSize: number;
  databaseURL: string;
  databaseName: string;
}

export default Config;
