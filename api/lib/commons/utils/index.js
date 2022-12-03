const isBlocked = async (key, redisClient) => {
  const found = await redisClient.findKey(key);
  return found;
}

const nextFreeAt = (data) => {
  let blockedTime = new Date(data);
  return new Date(blockedTime.setHours(blockedTime.getHours() + 1));
}

module.exports = {
  isBlocked,
  nextFreeAt
}
