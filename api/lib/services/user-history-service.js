const UserHistoryModel = require('../database/schemas/user-history');
const redisClient = require('../client/redis');
const logger = require('../commons/logger');

const quantityRequestLimit = Number(process.env.USER_QUANTITY_REQUESTS);
const periodTime = Number(process.env.USER_PERIOD_TIME);

const save = async (userHistory) => {
  const userHistoryModel = new UserHistoryModel(userHistory);
  await userHistoryModel.save(userHistory);
}

const find = async (username) => {
  const history = await UserHistoryModel.find({ username });
  const accumulatedPoints = history.reduce((prev, curr) => prev+curr.weight, 0);
  if (quantityRequestLimit < accumulatedPoints/*history.length*/) {
    let blockedUntil = history[0].createdAt;
    blockedUntil = blockedUntil.setTime(blockedUntil.getTime() + (periodTime*1000));
    await redisClient.setKey(username, blockedUntil, periodTime);
    logger.info('User blocked!');
  }
}

module.exports = {
  save,
  find
}
