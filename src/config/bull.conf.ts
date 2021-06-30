import Queue from 'bull'
import MailTransport from './nodemailer.conf.js'

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env

const mailQueue = new Queue('messages', {
	redis: {
		host: REDIS_HOST,
		port: parseInt(REDIS_PORT),
		password: REDIS_PASSWORD || undefined,
	},
})

mailQueue.process(async job => {
	try {
		const { mailOptions } = job.data

		MailTransport.sendMail(mailOptions, err => {
			if (err) return Promise.reject(err)

			return Promise.resolve(
				`Mail "${mailOptions.subject}" successfully sent to ${mailOptions.to}`
			)
		})
	} catch (err) {
		Promise.reject(err)
	}
})

export default mailQueue
