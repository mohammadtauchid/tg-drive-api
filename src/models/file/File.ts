// @ts-ignore
import MongoModels from 'mongo-models';

import schema from './schema';

class FileDB extends MongoModels {
  static collectionName: string;
  static schema: any;
}

FileDB.collectionName = 'files';
FileDB.schema = schema;

export default FileDB;
