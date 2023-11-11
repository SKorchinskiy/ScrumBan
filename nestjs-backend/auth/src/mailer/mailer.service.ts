import { Injectable } from '@nestjs/common';
import { MailerService as Mailer } from '@nestjs-modules/mailer';
import { Token } from 'src/auth.service';

@Injectable()
export class MailerService {
  constructor(private mailer: Mailer) {}

  async sendVerification(email: string, { accessToken, expiresIn }: Token) {
    return await this.mailer.sendMail({
      to: email,
      subject: 'Verify your ScrumBan account to start using the service',
      text: `Dear user! Your email ${email} was used to register to ScrumBan app.\n
            If it wasn't you, please ignore this message.\n
            Otherwise proceed with the following link: \n
            http://localhost:3000/auth/verify-account/${accessToken}. \n
            If the account isn't verified after ${expiresIn}, \n
            you'll need to pass registration process again.
            `,
    });
  }
}
