export default {
	Error: {
		type: 'object',
		properties: {
			msg: {
				type: 'string',
				description: 'Front-end friendly error message',
				example: 'Password needs at least 6 characters',
			},
		},
	},
}
