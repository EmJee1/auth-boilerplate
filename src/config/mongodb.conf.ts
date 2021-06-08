import mongoose from 'mongoose'
import logger from './winston.conf.js'

mongoose.connect(process.env.DB_CONNECTION_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

const db = mongoose.connection

db.once('open', () => logger.info('MongoDB connection successful'))

db.on('error', () => logger.error('MongoDB connection error'))
