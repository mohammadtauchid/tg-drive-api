import MongoModels from 'mongo-models';

import schema from './schema';

class FileDB extends MongoModels {
  static async find() {
    throw new Error('Method not implemented.');
  }
  static async insertOne(payload: Object): Promise<Object> {
    return super.insertOne(payload);
  }
  static collectionName: string;
  static schema: any;

  constructor(payload: Object) {
    super(payload);
  }
}

FileDB.collectionName = 'files';
FileDB.schema = schema;

export default FileDB;
