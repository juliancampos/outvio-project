const { isBlocked, nextFreeAt } = require('../utils');
const redisClient = require('../../client/redis');

const requestLimitToken = process.env.USER_QUANTITY_REQUESTS;
const expireKeyTime = process.env.USER_PERIOD_TIME;

const validatePrivateRoute = async (req, res, next) => {
  try {
    const result = await isBlocked(req.user.username, requestLimitToken, redisClient);
    if (result.blocked) {
      const freeAt = nextFreeAt(result);
      return res.status(429).send({
        messate: 'Limit request exceded',
        freeAt
      });
    }

    await redisClient.setKey(req.user.username, expireKeyTime);
    next();
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = validatePrivateRoute;
