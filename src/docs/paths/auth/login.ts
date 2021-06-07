export default {
	'/auth/login': {
		post: {
			tags: ['Authentication'],
			description: 'Logging in a registered user',
			operationId: 'authLogin',
			parameters: [
				{
					name: 'email',
					in: 'body',
					required: true,
					description: 'Email of the user that is trying to sign in',
					example: 'someone@example.com',
				},
				{
					name: 'password',
					in: 'body',
					required: true,
					description:
						'Plain password of the user that is trying to sign in',
					example: 'myp@ssw0rd',
				},
			],
			responses: {
				200: {
					description:
						'User logged in successfully with the right credentials',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/User',
							},
						},
					},
				},
			},
		},
	},
}
