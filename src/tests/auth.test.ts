import { server } from '../config/express.conf'
import User from '../models/User.js'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'

const request = supertest(app)

const { email, name, password } = {
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
