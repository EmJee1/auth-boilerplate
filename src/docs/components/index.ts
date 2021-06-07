import Error from './Error.js'
import User from './User.js'

export default {
	components: {
		schemas: {
			...Error,
			...User,
		},
	},
}
