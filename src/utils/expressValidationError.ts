import { Errback, Request, Response, NextFunction } from 'express'
import { ValidationError } from 'express-validation'

const expressValidationError = (
	err: Errback,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ValidationError)
		return res.status(err.statusCode).json(err)

	return res.status(500).json(err)
}

export default expressValidationError
