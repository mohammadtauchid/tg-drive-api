class FileRepository {
  db: any;

  constructor(options: any) {
    Object.assign(this, options);
  }

  async find() {
    return this.db.find();
  }

  async insertFile(payload: any) {
    const { files, fileName, fileSize, userId } = payload;

    const fileIds = files.map(
      ({
        result: {
          // @ts-ignore
          document: { file_id },
        },
      }) => file_id,
    );

    const result = await this.db.insertOne({
      fileIds, fileName, fileSize, userId
    })

    return result
  }
}

export default FileRepository;
