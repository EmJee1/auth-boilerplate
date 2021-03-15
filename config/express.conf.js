// import dependencies
import express from 'express'
import dotenv from 'dotenv'

// configure dotenv
dotenv.config()

// get necessary environment variables
const {
	APP_PORT,
	PARSE_JSON_BODY,
	PARSE_URLENCODED_BODY,
	PARSE_URLENCODED_BODY_EXTENDED,
} = process.env

// create express app instance
const app = express()

// global middleware (for all requests)
if (PARSE_JSON_BODY) app.use(express.json())
if (PARSE_URLENCODED_BODY)
	app.use(express.urlencoded({ extended: PARSE_URLENCODED_BODY_EXTENDED }))

// listen to defined port number
app.listen(APP_PORT, () => console.log(`Express listening on port ${APP_PORT}`))

// export express app object
export default app
