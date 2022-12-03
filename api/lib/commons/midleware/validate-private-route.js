const { isBlocked, nextFreeAt } = require('../utils');
const redisClient = require('../../client/redis');
const userHistoryService = require('../../services/user-history-service');

const validatePrivateRoute = (req, res, next) => {
  try {
    const { username } = req.user;
    isBlocked(username, redisClient).then((result) => {
      if (result) {
        const blockedUntil = nextFreeAt(result);
        return res.status(429).send({
          message: 'Limit request exceded on private route',
          blockedUntil
        });
      };

      userHistoryService.save({ username, route: req.baseUrl });
      userHistoryService.find(username);
      next();
    })
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = validatePrivateRoute;
