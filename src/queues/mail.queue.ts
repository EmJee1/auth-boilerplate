import { SentMessageInfo, Transporter } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/smtp-transport'
import queue from '../config/queue.conf.js'

const mailQueue = queue('nodemailer')

mailQueue.process(async job => {
	const {
		mailOptions,
		transport,
	}: {
		mailOptions: MailOptions
		transport: Transporter<SentMessageInfo>
	} = job.data

	transport.sendMail(mailOptions, err => {
		if (err) return Promise.reject(err)

		return Promise.resolve(
			`Mail "${mailOptions.subject}" successfully sent to ${mailOptions.to}`
		)
	})
})

export default mailQueue
