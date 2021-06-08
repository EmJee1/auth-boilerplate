import { Request, Response } from 'express'
import { compareSync } from 'bcrypt'
import jwt from 'jsonwebtoken'

import UserRegisteredMessage from '../messages/UserRegistered.msg.js'
import User from '../models/User.js'

const { JSON_WEBTOKEN_SECRET } = process.env

export const register = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const query = await User.findOne({ email: req.body.email })

	if (query)
		return res.status(409).json({ msg: 'User with email already exists' })

	const newUser = new User(req.body)
	await newUser.save()

	new UserRegisteredMessage(newUser).mail()

	return res.status(201).json({ msg: 'User created successfully' })
}

export const login = async (req: Request, res: Response): Promise<Response> => {
	const { email, password } = req.body

	const query = await User.findOne({ email })

	if (!query) return res.status(401).json({ msg: 'Credentials invalid' })

	if (!compareSync(password, query.password))
		return res.status(401).json({ msg: 'Credentials invalid' })

	const token = jwt.sign({ _id: query._id }, JSON_WEBTOKEN_SECRET, {
		expiresIn: '4d',
	})

	return res.status(200).json({ token, msg: 'Logged in successfully' })
}
