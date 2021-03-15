import { Joi } from 'express-validation'

export const test = {
	body: Joi.object({
		test: Joi.string().required(),
	}),
}