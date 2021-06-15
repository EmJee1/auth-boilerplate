import { DeepPartial } from 'mongo-seeding/dist/common'
import { Seeder, SeederConfig } from 'mongo-seeding'
import dotenv from 'dotenv'
import logger from '../config/winston.conf.js'

dotenv.config()

class DBSeeder {
	private Seeder: Seeder
	private seedData: any[] = []
	private seedCollection: string

	constructor(config?: DeepPartial<SeederConfig>) {
		this.Seeder = new Seeder({
			dropDatabase: false,
			dropCollections: true,
			database: process.env.DB_CONNECTION_URI,
			...config,
		})
	}

	public seed(): void {
		if (!this.seedData.length || !this.seedCollection) {
			logger.error('No data or collection found, add these before seed')
			return
		}

		this.Seeder.import([
			{ documents: this.seedData, name: this.seedCollection },
		])
			.then(() =>
				logger.info(
					`Successfully imported ${this.seedData.length} records into ${this.seedCollection}`
				)
			)
			.catch(err => logger.error(`DBSeeder error: ${err.message}`))
	}

	set appendData(data: any[]) {
		this.seedData.push(...data)
	}

	set collection(collection: string) {
		this.seedCollection = collection
	}
}

export default DBSeeder
