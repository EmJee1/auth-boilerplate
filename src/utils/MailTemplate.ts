import UserDocument from '../models/types/User.js'
import transport from '../config/nodemailer.conf.js'

const { API_BASEURL, API_MAILLOGO, APP_NAME, SEND_MAIL_FROM } = process.env

const generateMail = ({
	heading,
	content,
	actions,
}: {
	heading: string
	content: string[]
	actions: { text: string; href: string }[]
}): string => `
<html>
<body style="margin:0;padding:0;">
    <div style="background:#fff">
        <div style="max-width:100%;margin:0px auto;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%; background-color:#fff;">
                <tbody>
                    <tr>
                        <td>
                            <div style="max-width:100%;box-sizing:border-box; background:#161616">
                                <div style="width:100%;max-width:575px;min-width:300px;margin:auto;text-align:center;padding:15px">
                                    <img src="${API_BASEURL}${API_MAILLOGO}" style="height: 110px;">
                                </div>
                                <div style="width:100%;max-width:575px;min-width:300px;background:#fff;margin:auto;box-sizing:border-box;border-radius:4px;border-bottom-left-radius:0;border-bottom-right-radius:0;padding:50px 30px 10px;">
									<h1 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:left">
										${heading}
									</h1>
									<p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
										${content.join('<br><br>')}
									</p>
                                </div>
                            </div>
                        </td>
                    </tr>
					<tr>
						${actions
							.map(
								action => `
							<td class=”button” style="border-radius:2px;" bgcolor="#ED2939">
								<a class=”link” href="${action.href}" target="_blank" style="padding: 8px 12px;border: 1px solid #ED2939;border-radius: 2px;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size: 14px;color: #ffffff; text-decoration: none;font-weight: bold;display: inline-block;">
									${action.text}
								</a>
							</td>`
							)
							.join('<br><br>')}
                    </tr>
                    <tr>
                        <td>
                            <div style="width:100%;max-width:575px;min-width:300px;margin-left:auto;margin-right:auto; box-sizing:border-box;border-radius:4px;border-top-left-radius:0;border-top-right-radius:0;padding:10px 30px 50px; box-shadow: 5px 5px 5px #dadada;">
                                <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
                                    Thanks,<br>
                                    ${APP_NAME}
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div style="max-width:100%;margin:0px auto;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:100%">
                <tbody>
                    <tr>
                        <td>
                            <div style="width:100%;max-width:575px;min-width:300px;margin:auto;box-sizing:border-box;padding-top:20px;padding-bottom:20px;padding-left:15px;padding-right:15px;">
                                <p style="text-align:center; font-family:verdana;">
                                    <a href="#" style="text-align:center;font-size:13px;line-height:1.5;color:#999999; text-decoration: none; color: cornflowerblue;     display: flex; align-items: center; justify-content: center;">
                                </p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>`

class MailTemplate {
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

	private get html(): string {
		return generateMail({
			heading: this._heading,
			content: this._content,
			actions: this._actions,
		})
	}

	public sendMail(): void {
		if (!this._subject || !this._user) return

		const mailOptions: any = {
			from: SEND_MAIL_FROM,
			to: this._user.email,
			subject: this._subject,
			html: this.html,
		}

		transport.sendMail(mailOptions, err => {
			if (err) console.log('Mail error:', err)
		})
	}
}

export default MailTemplate
