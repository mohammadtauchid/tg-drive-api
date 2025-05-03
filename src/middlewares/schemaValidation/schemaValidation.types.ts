import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

interface Validation {
  files: Schema;
}

type Payload = Object | undefined | null

export { Validation, Schema, Request, Response, NextFunction, Payload };
