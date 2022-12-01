const privateRoutes = require('./private-routes');
const publicRoutes = require('./public-routes');

module.exports = (app) => {
  privateRoutes(app);
  publicRoutes(app);
}
