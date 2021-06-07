export default {
	User: {
		type: 'object',
		properties: {
			_id: {
				type: 'string',
				description: 'Unique user identifier',
				example: '6071a878a0178b5f10fcb284',
			},
			email: {
				type: 'string',
				description: 'E-mail address of a user',
				example: 'someone@example.com',
			},
			name: {
				type: 'string',
				description: 'Name of a user',
				example: 'John Doe',
			},
			createdAt: {
				type: 'date',
				description: 'Timestamp when user was registered',
				example: '2021-04-10T13:30:31.649+00:00',
			},
		},
	},
}
