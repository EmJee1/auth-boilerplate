import DataGenerator from '../vendor/DataGenerator.js'
import DBSeeder from '../vendor/DBSeeder.js'

const DataGen = new DataGenerator()
const Seeder = new DBSeeder()

for (let i = 0; i < 2; i++) {
	const { email, name, hashedPassword } = DataGen.user
	Seeder.appendData = [{ email, name, password: hashedPassword }]
}

Seeder.collection = 'users'
Seeder.seed()
