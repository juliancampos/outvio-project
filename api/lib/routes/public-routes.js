const { validatePublicRoute } = require('../commons/midleware');
const { publicController, loginController } = require('../controllers');

module.exports = (router) => {
  router.post('/login', loginController);

  router.use(validatePublicRoute);
  router.get('/user', publicController);
  router.get('/history', publicController);
}
