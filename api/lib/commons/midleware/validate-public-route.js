const { isBlocked, nextFreeAt } = require('../utils');
const redisClient = require('../../client/redis');

const requestLimitIp = process.env.IP_QUANTITY_REQUESTS;
const expireKey = process.env.IP_PERIOD_TIME;

const validatePublicRoute = async (req, res, next) => {
  try {
    const result = await isBlocked(req.ip, requestLimitIp, redisClient);
    if (result.blocked) {
      const freeAt = nextFreeAt(result);
      return res.status(429).send({
        messate: 'Limit request exceded',
        freeAt
      });
    }

    await redisClient.setKey(req.ip, expireKey);
    next();
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = validatePublicRoute;
