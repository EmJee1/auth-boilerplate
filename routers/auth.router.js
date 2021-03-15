// import dependencies
import express from 'express'
import { validate } from 'express-validation'

// import router helpers
import * as authHandler from '../controllers/auth.controller.js'
import * as authValidation from '../validation/auth.validation.js'

// create express router
const router = express.Router()

// initialize routes
router.post('/test', validate(authValidation.test), authHandler.test)

// export router
export default router
