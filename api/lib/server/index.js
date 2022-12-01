const express = require('express');
const logger = require('../commons/logger');
const routes = require('../routes');

const server = (() => {
  const port = process.env.PORT;
  const app = express();
  let serverProcess;

  const start = () => new Promise((resolve) => {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    routes(app);

    serverProcess = app.listen(port, () => {
      logger.info('------------------------------------------------------------------');
      logger.info(`Express server listening on port: ${port}`);
      logger.info('------------------------------------------------------------------');

      return resolve(app);
    });
  });

  const stop = () => new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    }
  });

  return {
    start,
    stop
  };
})();

module.exports = server;
