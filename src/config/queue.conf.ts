import Queue from 'bull'

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

const queue = (queueName: string): Queue.Queue<any> =>
	new Queue(queueName, {
		redis: {
			host: REDIS_HOST,
			port: parseInt(REDIS_PORT),
			password: REDIS_PASSWORD || undefined,
		},
	})

export default queue
