import mongoose from 'mongoose'

mongoose.connect(process.env.DB_CONNECTION_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
})

const db = mongoose.connection

db.once('open', () => console.log('MongoDB connection successful'))

db.on('error', () => console.log('MongoDB connection error'))
