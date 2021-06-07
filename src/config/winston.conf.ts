import winston from 'winston'

const { APP_NAME } = process.env

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.combine(
		winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		winston.format.json()
	),
	defaultMeta: { service: APP_NAME },
	transports: [
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error',
		}),
		new winston.transports.File({ filename: 'logs/combined.log' }),
	],
})

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new winston.transports.Console({ format: winston.format.simple() })
	)
}

export default logger
