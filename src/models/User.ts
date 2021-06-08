import mongoose from 'mongoose'
import { hash } from 'bcrypt'
import UserDocument from './types/User.js'

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
})

UserSchema.pre('save', async function (this: any, next) {
	if (!this.password) next()

	const hashed = await hash(this.password, 10)

	this.password = hashed
	next()
})

const User = mongoose.model<UserDocument>('user', UserSchema)

export default User
