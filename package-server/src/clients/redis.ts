import { Redis } from 'ioredis'

let redis: Redis | null = null
function getRedisClient() {
  if (redis) {
    return redis
  }

  redis = new Redis(process.env.REDIS_URL || '');


  redis.on('error', (err) => {
    console.error('Redis连接错误:', err)
  })

  redis.on('connect', () => {
    console.log('Redis连接成功')
  })
  redis.on('close', () => {
    console.log('Redis连接关闭')
    redis = null
  })

  return redis
}

export default getRedisClient


export async function acquireAsyncLock(key: string, value: string, ttl: number) {
  const result = await getRedisClient().set(key, value, 'PX', ttl, 'NX');
  return result === 'OK';
}

export async function releaseAsyncLock(key: string, value: string) {
  const script = `
    if redis.call("get", KEYS[1]) == ARGV[1]
    then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  return await getRedisClient().eval(script, 1, key, value);
}
