import { Request, Response, NextFunction } from 'express';

import * as localizations from '../utils/localizations';
import logger from '../utils/logger';

export const routeNotFound = (req: Request, res: Response, next: NextFunction) => {
  logger.error(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ message: localizations['en'].ERRORS.OTHER.NOT_FOUND_ENDPOINT });
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const { message, status } = err;

  logger.error(err);

  switch (err.name) {
    case 'UnauthorizedError':
      res.status(401).json({
        error: localizations['en'].ERRORS.OTHER.UNAUTHORIZED,
      });

    default:
      res.status(status || 500).json({ message });
  }
};
