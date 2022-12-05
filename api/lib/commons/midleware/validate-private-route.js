const { isBlocked } = require('../utils');
const redisClient = require('../../client/redis');
const userHistoryService = require('../../services/user-history-service');
const pointsPerRoute = require('../points-per-route');

const handleRouteToBlock = async (baseUrl, username) => {
  const weight = pointsPerRoute(baseUrl);
  await userHistoryService.save({ username, route: baseUrl, weight });
  await userHistoryService.find(username);
}

const validatePrivateRoute = (req, res, next) => {
  try {
    const { username } = req.user;
    isBlocked(username, redisClient).then((result) => {
      if (result) {
        const blockedUntil = new Date(Number(result));
        return res.status(429).send({
          message: 'Limit request exceded on private route',
          blockedUntil
        });
      };
      handleRouteToBlock(req.originalUrl, username);
      next();
    })
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = validatePrivateRoute;
