import { Request, Response, NextFunction } from 'express';

const createHandler =
  (handler: Function) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      Object.assign(res.locals, req.app.locals.service)
      await handler(req, res);
      next();
    } catch (error) {
      next(error);
    }
  };

export default createHandler;
