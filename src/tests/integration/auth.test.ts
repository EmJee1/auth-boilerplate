import mongoose from 'mongoose'
import supertest from 'supertest'
import { server } from '../../config/express.conf'
import User from '../../models/User.js'
import app from '../../app.js'
import { IUser } from '../../models/types/User.js'

const request = supertest(app)

const { email, name, password }:IUser = {
	email: 'test@email.com',
	name: 'Some username',
	password: 'password',
}

describe('Authentication', () => {
	afterAll(async () => {
		await User.deleteOne({ email, name })

		mongoose.disconnect()
		server.close()
	})

	it('Register new user', async () => {
		const res = await request
			.post('/auth/register')
			.send({ email, name, password })

		expect(res.status).toBe(201)
	})

	it('Logging the new user in', async () => {
		const res = await request.post('/auth/login').send({ email, password })

		expect(res.status).toBe(200)
		expect(res.body.token).toBeDefined()
	})
})
