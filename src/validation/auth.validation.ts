import tokenValidation from '../utils/tokenValidation'
import { Joi } from 'express-validation'

export const register = {
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
		name: Joi.string().min(4).required(),
	}),
}

export const login = {
	body: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
}

// to create protected route, add the autorization header custom validation function:
export const authenticated = {
	headers: Joi.object({
		authorization: Joi.string().custom(tokenValidation).required(),
	}).options({ allowUnknown: true }),
}
