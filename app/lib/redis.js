import IORedis from 'ioredis';

import { config } from '../../config/index.js';


class Redis {
  static io = new IORedis({
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
  });


  /// Get value by field and key
  static async get (field, key) {
    const value = await Redis.io.hget(field, key);
    return value;
  }


  /// Get keys by field
  static async getByField (field) {
    const keys = await Redis.io.hgetall(field);
    return keys;
  }


  /// Update by field and key
  static async set (field, key, value) {
    const createdCount = await Redis.io.hset(field, key, value);
    return createdCount;
  }


  /// Delete by field and key
  static async delete (field, key) {
    const delCount = await Redis.io.hdel(field, key);
    return delCount;
  }


  /// Flush all
  static async flushAll () {
    await Redis.io.flushall();
  }


  /// Flush by field
  static async flushByField (field) {
    await Redis.io.unlink(field);
  }
}


export { Redis };
