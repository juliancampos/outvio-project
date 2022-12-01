const isBlocked = async (key, requestLimit, redisClient) => {
  const keysFound = await redisClient.getKeys(`${key}_`);
  return {
    blocked: !(requestLimit > keysFound.length||0),
    key: keysFound[0]
  }
}

const nextFreeAt = (data) => {
  let [,blockedTime] = data.key.split('_');
  blockedTime = new Date(blockedTime);
  return new Date(blockedTime.setHours(blockedTime.getHours() + 1));
}

module.exports = {
  isBlocked,
  nextFreeAt
}
