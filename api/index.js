require('dotenv').config()
const logger = require('./lib/commons/logger');
const server = require('./lib/server');
const redisClient = require('./lib/client/redis');
const database = require('./lib/database');

const shutdown = async () => {
  logger.info('Server receive signal to shutdown.');
  await redisClient.disconnect();
  await database.disconnect();
  await server.stop();
  process.exit(0);
};

process
  .on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('SIGHUP', shutdown)
  .on('uncaughtException', (err) => {
    logger.warn('uncaughtException caught the error: %O', err);
    throw err;
  })
  .on('unhandledRejection', (err, promise) => {
    logger.warn(`Unhandled Rejection at: Promise ${promise} reason: ${err}`);
    throw err;
  })
  .on('exit', (code) => {
    logger.info(`Node process exit with code: ${code}`);
  });

(async () => {
  try {
    await database.connect();
    await redisClient.connect();
    await server.start();
  } catch (error) {
    logger.warn('[APP] initialization failed', error);
    process.emit('SIGTERM');
  }
  logger.info('[APP] initialized SUCCESSFULLY');
})();
