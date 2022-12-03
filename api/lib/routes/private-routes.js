const { validatePrivateRoute } = require('../commons/midleware')
const authenticateToken = require('../commons/midleware/authenticate')
const { privateControler } = require('../controllers')

module.exports = (router) => {
  router.use(authenticateToken, validatePrivateRoute);
  router.get('/', privateControler);
}
