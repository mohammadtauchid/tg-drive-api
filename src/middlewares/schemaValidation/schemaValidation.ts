import {
  Validation,
  Schema,
  Request,
  Response,
  NextFunction,
  Payload,
} from './schemaValidation.types';

const validateSchema = (payload: Payload, schema: Schema) => {
  const { error, value } = schema.validate(payload);

  if (error) {
    throw error;
  }

  return value;
};

const schemaValidation =
  (validation: Validation) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { files: fileSchema } = validation;
    const { files } = req;

    Object.assign(res.locals, {
      payload: {
        files: fileSchema ? validateSchema(files, fileSchema) : files,
      },
    });

    next();
  };

export default schemaValidation;
