import ejs from 'ejs'
import transport from '../config/nodemailer.conf.js'
import UserDocument from '../models/types/User.js'
import logger from '../config/winston.conf.js'

class Mailer {
	private _subject: string
	private _heading: string
	private _content: string[] = []
	private _user: UserDocument
	private _actions: { text: string; href: string }[] = []

	constructor(user: UserDocument) {
		this._user = user
	}

	public subject(subject: string): this {
		this._subject = subject
		return this
	}

	public heading(heading: string): this {
		this._heading = heading
		return this
	}

	public line(content: string): this {
		this._content.push(content)
		return this
	}

	public action(action: { text: string; href: string }): this {
		this._actions.push(action)
		return this
	}

	public sendMail(templateName?: string): void {
		if (!this._subject || !this._user) return

		const mailOptions: any = {
			from: process.env.SEND_MAIL_FROM,
			to: this._user.email,
			subject: this._subject,
		}

		ejs.renderFile(
			`dist/messages/templates/${templateName || 'email.template.ejs'}`,
			{
				heading: this._heading,
				content: this._content,
				actions: this._actions,
			}
		)
			.then(html => {
				mailOptions.html = html
				transport.sendMail(mailOptions, err => {
					if (err) logger.error(`Nodemailer error: ${err}`)
				})
			})
			.catch(err =>
				logger.error(`Error while parsing ejs mail template: ${err}`)
			)
	}
}

export default Mailer
