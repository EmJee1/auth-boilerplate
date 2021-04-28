import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const {
	APP_PORT,
	PARSE_JSON_BODY,
	PARSE_URLENCODED_BODY,
	PARSE_URLENCODED_BODY_EXTENDED,
} = process.env

const app = express()

// global middleware (for all requests)
if (parseInt(PARSE_JSON_BODY)) app.use(express.json())
if (parseInt(PARSE_URLENCODED_BODY)) {
	const extended = PARSE_URLENCODED_BODY_EXTENDED ? true : false
	app.use(express.urlencoded({ extended }))
}

app.use(cors())

app.listen(APP_PORT, () => console.log(`Express listening on port ${APP_PORT}`))

export default app
