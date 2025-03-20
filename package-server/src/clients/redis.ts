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