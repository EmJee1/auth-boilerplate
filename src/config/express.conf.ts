import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const { APP_PORT } = process.env

const app = express()

// global middleware (for all requests)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('dist/public'))
app.use(cors())

app.listen(APP_PORT, () => console.log(`Express listening on port ${APP_PORT}`))

export default app
