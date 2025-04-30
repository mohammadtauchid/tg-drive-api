import Joi from 'joi';

export default Joi.object().keys({
  _id: Joi.object().description('MongoDB unique ID').required(),
  // userId: Joi.object().description('User ID').required(),
  fileIds: Joi.array()
    .items(Joi.string().description('File ID').required())
    .required(),
  fileName: Joi.string().description('File Name').required(),
  fileSize: Joi.number().description('File Size').required(),
  createdAt: Joi.date().default(new Date()),
  modifiedAt: Joi.date().default(new Date())
}).unknown(true);
