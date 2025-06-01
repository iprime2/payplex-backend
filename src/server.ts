import app from './app';
import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import logger from './config/logger';

dotenv.config();

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    logger.info('Database connected');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    logger.error('Database connection failed: ' + error);
    process.exit(1);
  });
