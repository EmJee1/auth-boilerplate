import logger from './winston.conf.js'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const { APP_PORT } = process.env

const app = express()

// global middleware (for all requests)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'))
app.use(cors())

export const server = app.listen(APP_PORT, () =>
	logger.info(`Express listening on port ${APP_PORT}`)
)

export default app
