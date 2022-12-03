const UserHistoryModel = require('../database/schemas/user-history');
const redisClient = require('../client/redis');
const logger = require('../commons/logger');

const quantityRequestLimit = process.env.USER_QUANTITY_REQUESTS;

const save = async (userHistory) => {
  const userHistoryModel = new UserHistoryModel(userHistory);
  await userHistoryModel.save(userHistory);
}

const find = async (username) => {
  const history = await UserHistoryModel.find({ username });
  if (quantityRequestLimit < history.length) {
    await redisClient.setKey(username, 20);
    logger.info('User blocked!');
  }
}

module.exports = {
  save,
  find
}
