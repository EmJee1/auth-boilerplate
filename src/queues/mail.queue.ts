import MailTransport from '../config/nodemailer.conf.js'
import queue from '../config/queue.conf.js'

const mailQueue = queue('nodemailer')

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
