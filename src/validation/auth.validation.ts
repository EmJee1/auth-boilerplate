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
