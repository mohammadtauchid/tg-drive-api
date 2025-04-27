import Joi from 'joi';

const validateSchema = (payload: any, schema: any) => {
  const { error, value } = schema.validate(payload);
  if (error) {
    throw error;
  }
  return value;
};

const schemaValidation =
  (validation: any) => (req: any, res: any, next: any) => {
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
