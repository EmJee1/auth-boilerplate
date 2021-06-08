import Joi from 'joi'
import tokenValidation from '../utils/tokenValidation.js'

export const register = {
	body: Joi.object({
		email: Joi.string()
			.email()
			.required()
			.error(new Error('Email has to be a valid address')),
		password: Joi.string()
			.min(6)
			.required()
			.error(new Error('Password needs at least 6 characters')),
		name: Joi.string()
			.min(4)
			.required()
			.error(new Error('Name needs at least 4 characters')),
	}),
}

export const login = {
	body: Joi.object({
		email: Joi.string()
			.email()
			.required()
			.error(new Error('Email has to be a valid address')),
		password: Joi.string()
			.min(6)
			.required()
			.error(new Error('Password needs at least 6 characters')),
	}),
}

// to create protected route, add the autorization header custom validation function:
export const authenticated = {
	headers: Joi.object({
		authorization: Joi.string().custom(tokenValidation).required(),
	}).options({ allowUnknown: true }),
}
