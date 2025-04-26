import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  status?: number;
}

export {
  AppError,
  Request,
  Response,
  NextFunction
}