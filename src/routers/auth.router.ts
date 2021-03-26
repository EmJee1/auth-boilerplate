// import dependencies
import { Router } from 'express'
import { validate } from 'express-validation'

// import router helpers
import * as authHandler from '../controllers/auth.controller.js'
import * as authValidation from '../validation/auth.validation.js'

// create express router
const router = Router()

// initialize routes
router.post(
	'/register',
	validate(authValidation.register),
	authHandler.register
)
router.post('/login', validate(authValidation.login), authHandler.login)

// export router
export default router
