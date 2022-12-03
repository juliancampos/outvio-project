const privateRoutes = require('./private-routes');
const publicRoutes = require('./public-routes');

// module.exports = (router) => {
//   privateRoutes(router);
//   publicRoutes(router);
// }

module.exports = {
  privateRoutes,
  publicRoutes
}
