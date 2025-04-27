import { UploadedFile } from 'express-fileupload';

interface UploadFilePayload {
  file: UploadedFile;
}

export { UploadFilePayload };
