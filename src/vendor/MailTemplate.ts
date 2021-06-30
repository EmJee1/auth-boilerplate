import ejs from 'ejs'
import mailQueue from '../queues/mail.queue.js'
import transport from '../config/nodemailer.conf.js'
import UserDocument from '../models/types/User.js'
import logger from '../config/winston.conf.js'

interface MailContentItem {
	content: string
	href?: string
	type: 'HEADING' | 'LINE' | 'ACTION'
}

class Mailer {
	private _user: UserDocument
	private _mailContent: MailContentItem[] = []
	private _queue = false
	private _mailOptions: {
		from?: string
		to?: string
		subject?: string
		html?: string
	} = {}

	constructor(user: UserDocument) {
		this._user = user

		this._mailOptions.from = process.env.SEND_MAIL_FROM
		this._mailOptions.to = this._user.email
	}

	public subject(subject: string): this {
		this._mailOptions.subject = subject
		return this
	}

	public heading(content: string): this {
		this._mailContent.push({ content, type: 'HEADING' })
		return this
	}

	public line(content: string): this {
		this._mailContent.push({ content, type: 'LINE' })
		return this
	}

	public action(content: string, href: string): this {
		this._mailContent.push({ content, href, type: 'ACTION' })
		return this
	}

	public queue(): this {
		this._queue = true
		return this
	}

	public sendMail(templateName?: string): void {
		if (!this._mailOptions.subject || !this._user) return

		const template = templateName || 'email.template.ejs'

		ejs.renderFile(`dist/messages/templates/${template}`, {
			content: this._mailContent,
		})
			.then((html): any => {
				this._mailOptions.html = html

				if (this._queue)
					return mailQueue.add({ mailOptions: this._mailOptions })

				return transport.sendMail(this._mailOptions, err => {
					if (err) logger.error(`Nodemailer error: ${err}`)
				})
			})
			.catch(err => logger.error(`EJS Parsing error: ${err}`))
	}
}

export default Mailer
