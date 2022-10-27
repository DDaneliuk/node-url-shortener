const Redis = require('redis');

// connection
const redisClient = Redis.createClient()
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then(r => console.log('[+] Connected to redis server'));

module.exports = redisClient;
