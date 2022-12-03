const express = require('express');
const logger = require('../commons/logger');
const { publicRoutes, privateRoutes } = require('../routes');

const port = process.env.PORT;

class Server {
  constructor() {
    this.express = express();
    this.privateRouter = express.Router();
    this.publicRouter = express.Router();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  start() {
    this.express.listen(port, () =>
      logger.info(`[app] running at port: ${port} `)
    );
  }

  stop() {
    this.express.close();
  }

  routes() {
    publicRoutes(this.publicRouter);  
    privateRoutes(this.privateRouter);
    
    this.express.use('/public', this.publicRouter);
    this.express.use('/private', this.privateRouter);
  }
}
module.exports = new Server();
