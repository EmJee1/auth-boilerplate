// import dependencies
import { Router } from 'express'
import validate from '../middlewares/validate.js'

// import router helpers
import * as handler from '../controllers/auth.controller.js'
import * as validation from '../validation/auth.validation.js'

// create express router
const router = Router()

// initialize routes
router.post('/register', validate(validation.register), handler.register)
router.post('/login', validate(validation.login), handler.login)

// export router
export default router
