import cors from 'cors'
import express from 'express'
import swaggerUI from 'swagger-ui-express'
import dotenv from 'dotenv'
import logger from './winston.conf.js'
import docs from '../docs'

dotenv.config()

const { APP_PORT } = process.env

const app = express()

// global middleware (for all requests)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'))
app.use(cors())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs))

export const server = app.listen(APP_PORT, () => logger.info(`Express listening on port ${APP_PORT}`))

export default app
