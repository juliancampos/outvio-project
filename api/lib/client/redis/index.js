const redis = require('redis');
const logger = require('../../commons/logger');

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});

const setKey = async(key, blockedUntil, periodTime) => {
  await client.set(key, blockedUntil);
  await client.expire(key, periodTime);
}

const getKeys = async(key) => {
  const result = await client.keys(`${key}*`);
  return result;
}

const findKey = async(key) => {
  const result = await client.get(key);
  return result;
}

const deleteKey = async () => {
  await client.flushAll()
}

const connect = async () => {
  await client.connect();
  logger.info('[Redis] client connected!');
} 

const disconnect = async () => {
  await client.disconnect();
  logger.info('[Redis] client connected!');
} 

module.exports = {
  setKey,
  getKeys,
  deleteKey,
  connect,
  disconnect,
  findKey
}
