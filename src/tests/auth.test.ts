import { server } from '../config/express.conf'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'

const request = supertest(app)

describe('Authentication', () => {

	afterAll(() => {
		mongoose.disconnect()
		server.close()
	})

	it('Register new user', async () => {
		const res = await request
			.post('/auth/register')
			.send({
				email: 'test@email.com',
				name: 'Some username',
				password: 'password',
			})

		expect(res.status).toBe(201)
	})
})
