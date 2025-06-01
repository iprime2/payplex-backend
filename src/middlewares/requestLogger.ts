import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';
import { v4 as uuidv4 } from 'uuid';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  const requestId = uuidv4();

  (req as any).requestId = requestId;

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';

    logger.log(
      logLevel,
      `${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms - IP: ${req.ip} - ReqID: ${requestId}`
    );
  });

  next();
};
