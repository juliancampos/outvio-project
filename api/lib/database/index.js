let mongoose = require('mongoose');
const logger = require('../commons/logger');

const uri = process.env.DATABASE_URI;

class Database {
  constructor() { }

  async connect() {
    return new Promise((resolve) => {
      mongoose.connect(uri)
        .then(() => {
          logger.info('[database] connected successfuly!');
          resolve();
        })
        .catch((error) => {
          logger.error('[database] error trying to connect: ' + error.message);
        })
    })
  }

  async disconnect() {
    return new Promise((resolve) => {
      mongoose.disconnect()
        .then(() => {
          logger.info('[database] disconnected!');
          resolve();
        });
    });
  }
}

module.exports = new Database()
