import dotenv from 'dotenv'
import { Seeder } from 'mongo-seeding'
import logger from '../config/winston.conf.js'
import { IUser } from '../models/types/User.js'
import DataGenerator from '../vendor/DataGenerator.js'

dotenv.config()

const RECORDS_TO_IMPORT = 30
const DataGen = new DataGenerator()
const documents: IUser[] = []
const seeder = new Seeder({
	database: process.env.DB_CONNECTION_URI,
	dropDatabase: false,
	dropCollections: true,
})

for (let i = 0; i < RECORDS_TO_IMPORT; i++) {
	const { email, name, hashedPassword } = DataGen.user
	documents.push({ email, name, password: hashedPassword })
}

seeder
	.import([{ name: 'users', documents }])
	.then(() =>
		logger.info(`Seeder successfully imported ${RECORDS_TO_IMPORT} records`)
	)
	.catch(err => logger.error(err.message))
