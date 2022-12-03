const { isBlocked, nextFreeAt } = require('../utils');
const redisClient = require('../../client/redis');
const { ipHistoryService } = require('../../services');

const validatePublicRoute = (req, res, next) => {
  try {
    const { ip } = req;
    isBlocked(ip, redisClient).then((result) => {
      if (result) {
        const blockedUntil = nextFreeAt(result);
        return res.status(429).send({
          messate: 'Limit request exceded on public route',
          blockedUntil
        });
      };

      ipHistoryService.save({ ip, route: req.baseUrl });
      ipHistoryService.find(ip);
      next();
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = validatePublicRoute;
