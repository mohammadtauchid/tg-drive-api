import {
  AppError,
  Request,
  Response,
  NextFunction,
} from './errorHandler.types';

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

export default errorHandler;
