const { isBlocked } = require('../utils');
const redisClient = require('../../client/redis');
const { ipHistoryService } = require('../../services');
const pointsPerRoute = require('../points-per-route');

const handleRouteToBlock = async (url, ip) => {
  const weight = pointsPerRoute(url);
  await ipHistoryService.save({ ip, route: url, weight });
  await ipHistoryService.find(ip);
}

const validatePublicRoute = (req, res, next) => {
  try {
    const { ip } = req;
    isBlocked(ip, redisClient).then((result) => {
      if (result) {
        const blockedUntil = new Date(Number(result));
        return res.status(429).send({
          message: 'Limit request exceded on public route',
          blockedUntil
        });
      };

      handleRouteToBlock(req.originalUrl, ip);
      next();
    });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

module.exports = validatePublicRoute;
