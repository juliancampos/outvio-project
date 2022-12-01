const { validatePrivateRoute } = require('../commons/midleware')
const authenticateToken = require('../commons/midleware/authenticate')
const { privateControler } = require('../controllers')

module.exports = (app) => {
  app.get('/private', authenticateToken, validatePrivateRoute, privateControler);
}
