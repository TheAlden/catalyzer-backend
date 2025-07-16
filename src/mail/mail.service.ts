import { Injectable } from '@nestjs/common';
import * as formData from 'form-data';
import Mailgun from 'mailgun.js';


@Injectable()
export class MailService {
  private mg;

  constructor() {
    const mailgun = new Mailgun(formData);
    this.mg = mailgun.client({
      username: 'api',
      // Make sure you have a file called ".env" 
      // with MAILGUN_API_KEY='key-XXXXXXXXXXXXXXXXXXXX'
      key: process.env.MAILGUN_API_KEY,
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    // Make sure you have a file called ".env" 
    // with MAILGUN_DOMAIN='sandboxXXXXXXXXXXXXXXXX.mailgun.org'
    const domain = process.env.MAILGUN_DOMAIN;

    try {
      const result = await this.mg.messages.create(domain, {
        from: `Your App <mailgun@${domain}>`,
        to: [to],
        subject,
        text,
      });
      return result;
    } catch (err) {
      console.error('Failed to send email:', err);
      throw err;
    }
  }
}