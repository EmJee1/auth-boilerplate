import mongoose from 'mongoose'
import { hash } from 'bcrypt'

interface UserDocument extends mongoose.Document {
	email: string
	name: string
	password: string
	createdAt: Date
}

const UserSchema = new mongoose.Schema({
	email: String,
	name: String,
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
