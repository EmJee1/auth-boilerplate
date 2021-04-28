import jwt from 'jsonwebtoken'

const { JSON_WEBTOKEN_SECRET } = process.env

interface HelpersInterface {
	error: (str: string) => any
}

const tokenValidation = (value: string, helpers: HelpersInterface): any => {
	const payload = value.split(' ')

	if (payload[0] !== 'Bearer') return helpers.error('any.invalid')

	try {
		jwt.verify(payload[1], JSON_WEBTOKEN_SECRET)
	} catch (err) {
		return helpers.error('any.invalid')
	}

	return payload
}

export default tokenValidation
