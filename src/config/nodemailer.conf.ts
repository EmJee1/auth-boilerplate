import nodemailer from 'nodemailer'

const { SMTP_MAIL_HOST, SMTP_MAIL_PORT, MAIL_AUTH_USER, MAIL_AUTH_PASSWORD } =
	process.env

const transporter = nodemailer.createTransport({
	host: SMTP_MAIL_HOST,
	port: parseInt(SMTP_MAIL_PORT),
	auth: {
		user: MAIL_AUTH_USER,
		pass: MAIL_AUTH_PASSWORD,
	},
})

export default transporter
