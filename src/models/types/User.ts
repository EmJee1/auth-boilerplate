import mongoose from 'mongoose'

interface UserDocument extends mongoose.Document {
	email: string
	name: string
	password: string
	createdAt: Date
}

export interface IUser {
	email: string
	name: string
	password: string
	createdAt?: Date
}

export default UserDocument
