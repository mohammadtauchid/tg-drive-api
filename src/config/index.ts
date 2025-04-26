import dotenv from 'dotenv';

import Config from './types';

dotenv.config();

const config: Config = {
  port: Number(process.env.PORT),
};

export default config;
