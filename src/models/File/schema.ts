import Joi from 'joi';

export default Joi.object().keys({
  _id: Joi.object()
    .keys({ $oid: Joi.string().hex().length(24) })
    .description('MongoDB unique ID'),
  // userId: Joi.object()
  //   .keys({ $oid: Joi.string().hex().length(24) })
  //   .description('User ID').required(),
  fileIds: Joi.array().items(Joi.string().description('File ID')).required(),
  fileName: Joi.string().description('File name').required(),
  fileSize: Joi.number().description('File size').required(),
  createdAt: Joi.date().description('File creation date').required(),
  modifiedAt: Joi.date().description('File modification date').required(),
}).unknown(true); // TODO: omit the unknown once userId is fixed
