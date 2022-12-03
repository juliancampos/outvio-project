const IpHistoryModel = require('../database/schemas/ip-history');
const redisClient = require('../client/redis');
const logger = require('../commons/logger');

const quantityRequestLimit = process.env.IP_QUANTITY_REQUESTS;

const save = async (ipHistory) => {
  const ipHistoryModel = new IpHistoryModel(ipHistory);
  await ipHistoryModel.save(ipHistory);
}

const find = async (ip) => {
  const history = await IpHistoryModel.find({ ip });
  if (quantityRequestLimit < history.length) {
    await redisClient.setKey(ip, 20);
    logger.info('Ip blocked!');
  }
}

module.exports = {
  save,
  find
}
