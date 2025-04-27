import Joi from 'joi';

const uploadFileSchema = {
  files: Joi.object()
    .keys({
      file: Joi.object().required(),
    })
    .required().label('files').description('Uploaded file'),
};

export { uploadFileSchema };
