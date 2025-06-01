import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { logger } from '@/utils/logger';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  // Log the error with timestamp
  logger.error({
    route: req.originalUrl,
    method: req.method,
    message: err.message,
    stack: err.stack,
  });

  // Handle validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    });
  }

  const status = err.status || 500;

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};
