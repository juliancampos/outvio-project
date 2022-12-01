const { validatePublicRoute } = require('../commons/midleware');
const { publicController, loginController } = require('../controllers');

module.exports = (app) => {
  app.get('/public', validatePublicRoute, publicController);
  app.post('/login', loginController);
}
