
const publicRouteUser = process.env.PUBLIC_ROUTE_USER_POINTS;
const publicRouteHistory = process.env.PUBLIC_ROUTE_HISTORY_POINTS;
const privateRouteUser = process.env.PRIVATE_ROUTE_POINTS;

const dataPoints = {
  '/public/user': publicRouteUser,
  '/public/history': publicRouteHistory,
  '/private': privateRouteUser 
}

const pointsPerRoute = (baseUrl) => {
  return dataPoints[baseUrl];
}

module.exports = pointsPerRoute;
