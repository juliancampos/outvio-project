const IpHistoryModel = require('../database/schemas/ip-history');
const redisClient = require('../client/redis');
const logger = require('../commons/logger');

const quantityRequestLimit = Number(process.env.IP_QUANTITY_REQUESTS);
const periodTime = Number(process.env.IP_PERIOD_TIME);

const save = async (ipHistory) => {
  const ipHistoryModel = new IpHistoryModel(ipHistory);
  await ipHistoryModel.save(ipHistory);
}

const find = async (ip) => {
  const history = await IpHistoryModel.find({ ip });
  const accumulatedPoints = history.reduce((prev, curr) => prev+curr.weight, 0);
  if (quantityRequestLimit < accumulatedPoints) {
    let blockedUntil = history[0].createdAt;
    blockedUntil = blockedUntil.setTime(blockedUntil.getTime() + (periodTime*1000));
    await redisClient.setKey(ip, blockedUntil, periodTime);
    logger.info('Ip blocked!');
  }
}

module.exports = {
  save,
  find
}
