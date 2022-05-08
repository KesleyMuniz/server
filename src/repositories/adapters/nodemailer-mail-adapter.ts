import { MailAdapter, SendMailData } from "./mail-adapters";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "69aa8b4cb1401e",
    pass: "b8f9cd8c7f8eb0"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sandMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@oi.com>',
      to: 'Kesley <skyzone121@hotmail.com>',
      subject,
      html: body,
  })
  }
  
}