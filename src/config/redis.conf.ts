import Redis from 'redis'

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

const redis = Redis.createClient({
	host: REDIS_HOST,
	port: parseInt(REDIS_PORT),
	password: REDIS_PASSWORD || undefined,
})

export default redis
