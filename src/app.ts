// import configs
import app from './config/express.conf.js'
import './config/mongodb.conf.js'

// import routers
import authRouter from './routers/auth.router.js'

// use routers
app.use('/auth', authRouter)

export default app
