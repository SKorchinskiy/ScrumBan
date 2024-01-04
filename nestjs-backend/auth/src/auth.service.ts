import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from './mailer/mailer.service';
import { ConfigService } from '@nestjs/config';

export type Payload = {
  user_id: string | number;
  display_name: string;
  email: string;
};

export type Token = {
  accessToken: string;
  expiresIn: string;
};

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER') private userMicroservice: ClientProxy,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async verifyRegisteredAccount(verificationToken: string): Promise<boolean> {
    try {
      const { user_id, display_name, email } =
        await this.jwtService.verifyAsync(verificationToken, {
          secret: this.configService.get<string>('EMAIL_SECRET_SIGNATURE'),
        });
      await lastValueFrom(
        this.userMicroservice.send(
          { cmd: 'confirm_user_verified' },
          { user_id, display_name, email },
        ),
      );
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendVerificationEmail(email: string, emailVerification: Token) {
    await this.mailerService.sendVerification(email, emailVerification);
  }

  async signUserIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Token> {
    const user = await lastValueFrom(
      this.userMicroservice.send({ cmd: 'validate_user' }, { email, password }),
    );

    const tokenPayload: Payload = {
      user_id: user.user_id,
      display_name: user.display_name,
      email: user.email,
    };

    return await this.jwtAuthTokenIssuer(tokenPayload);
  }

  async signUserUp(payload: CreateUserDto) {
    const user = await lastValueFrom(
      this.userMicroservice.send(
        {
          cmd: 'create_user',
        },
        payload,
      ),
    );

    const tokenPayload: Payload = {
      user_id: user.user_id,
      display_name: user.display_name,
      email: user.email,
    };
    const emailVerification: Token = await this.jwtEmailVerificationToken(
      tokenPayload,
    );
    await this.sendVerificationEmail(user.email, emailVerification);

    return {
      message: `A verification email was sent to the provided\n 
      email: ${user.email}. Please, verify it before continuing!`,
    };
  }

  async jwtAuthTokenIssuer(payload: Payload): Promise<Token> {
    const expiresIn = '24h';
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('AUTH_SECRET_SIGNATURE'),
      expiresIn,
    });
    return {
      accessToken,
      expiresIn,
    };
  }

  async jwtEmailVerificationToken(payload: Payload): Promise<Token> {
    const expiresIn = '24h';
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('EMAIL_SECRET_SIGNATURE'),
      expiresIn,
    });
    return {
      accessToken,
      expiresIn,
    };
  }
}
