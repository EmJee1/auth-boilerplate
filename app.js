// import express app
import app from './config/express.conf.js'

// import routers
import authRouter from './routers/auth.router.js'

// use routers
app.use('/auth', authRouter)

// import validation error handler
import expressValidationError from './utils/expressValidationError.js'

// handle validation errors
app.use(expressValidationError)
