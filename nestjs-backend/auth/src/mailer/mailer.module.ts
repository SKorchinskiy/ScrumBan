import { Module } from '@nestjs/common';
import { MailerModule as Mailer } from '@nestjs-modules/mailer';
import { MailerService } from './mailer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    Mailer.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('SMTP_HOST'),
          port: configService.get<number>('SMTP_PORT'),
          secure: true,
          auth: {
            user: configService.get<string>('SMTP_AUTH_USER'),
            pass: configService.get<string>('SMTP_AUTH_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" ${configService.get<string>('SMTP_AUTH_USER')}`,
        },
        preview: true,
      }),
    }),
  ],
  providers: [MailerService, ConfigService],
  exports: [MailerService],
})
export class MailerModule {}
