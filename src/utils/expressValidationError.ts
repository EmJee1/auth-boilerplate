import { Errback, NextFunction, Request, Response } from 'express'
import { ValidationError } from 'express-validation'

const expressValidationError = (
	err: Errback,
	req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
): Response => {
	if (err instanceof ValidationError)
		return res.status(err.statusCode).json(err)

	return res.status(500).json(err)
}

export default expressValidationError
