import DataGenerator from 'fluxxo-core/dist/DataGenerator'
import DBSeeder from 'fluxxo-core/dist/DBSeeder'
import dotenv from 'dotenv'

dotenv.config()
const DataGen = new DataGenerator()
const Seeder = new DBSeeder()

for (let i = 0; i < 2; i++) {
	const { email, name, hashedPassword } = DataGen.user
	Seeder.appendData = [{ email, name, password: hashedPassword }]
}

Seeder.collection = 'users'
Seeder.seed()
