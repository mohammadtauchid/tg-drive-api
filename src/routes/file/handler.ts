import { Request, Response } from 'express';

const uploadFileHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {
    locals: {
      fileService,
      payload: { files },
    },
  } = res;

  const result = await fileService.uploadFile({ file: files.file });
  res.send(result);
};

export { uploadFileHandler };
