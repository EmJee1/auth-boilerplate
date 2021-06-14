import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

const validate =
	(schema: { body?: ObjectSchema<any>; headers?: ObjectSchema<any> }) =>
		(req: Request, res: Response, next: NextFunction): Response | void => {
			try {
				Object.keys(schema).forEach((check: 'body' | 'headers') => {
					const { error } = schema[check].validate(req[check])

					if (error) throw new Error(error.message)
				})
			} catch (err) {
				return res.status(422).json({ msg: err.message })
			}

			return next()
		}

export default validate
