const jwt = require('jsonwebtoken');
const logger = require('../logger');

const authenticateToken = (req, res, next) => {
  const authorization = req.headers['authorization'];
  const [,token] = authorization && authorization.split(' ');

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
    if (error) {
      logger.error(error);
      return res.sendStatus(403);
    };
    req.user = user;
    next();
  })
}

module.exports = authenticateToken;
