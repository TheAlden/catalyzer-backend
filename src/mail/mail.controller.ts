import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; text: string }) {
    return this.mailService.sendEmail(body.to, body.subject, body.text);
  }
}