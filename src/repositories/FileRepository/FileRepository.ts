import { File } from '../../models';

import { FileRepositoryOptions } from './FileRepository.types';

class FileRepository {
  db: typeof File;

  constructor(options: FileRepositoryOptions) {
    Object.assign(this, options);
  }

  async find() {
    return this.db.find();
  }

  async save(payload: Object): Promise<Object> {
    return this.db.insertOne(
      new this.db({
        ...payload,
        createdAt: new Date(),
        modifiedAt: new Date(),
      }),
    );
  }
}

export default FileRepository;
