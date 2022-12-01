const jwt = require('jsonwebtoken');
const expiresIn = process.env.TOKEN_EXPIRE_TIME;

const createToken = (username) => {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn });
}

module.exports = {
  createToken,
}
