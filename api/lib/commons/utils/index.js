const isBlocked = async (key, redisClient) => {
  const found = await redisClient.findKey(key);
  return found;
}

module.exports = {
  isBlocked,
}
