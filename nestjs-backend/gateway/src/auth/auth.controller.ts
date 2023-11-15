import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { Response } from 'express';

type Token = {
  accessToken: string;
  expiresIn: string;
};
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('verify-account/:token')
  async verifyRegisteredAccount(@Param('token') verificationToken: string) {
    return await this.authService.verifyRegisteredAccount(verificationToken);
  }

  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() payload: { email: string; password: string },
  ) {
    const token: Token = await this.authService.signIn(payload);
    response.setHeader(
      'Set-Cookie',
      `Authentication=${token.accessToken}; HttpOnly; Path=/; Max-Age=${token.expiresIn}`,
    );
    return token;
  }

  @Post('sign-up')
  async signUp(@Body() payload: CreateUserDto) {
    return await this.authService.signUp(payload);
  }

  @Post('sign-out')
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    return {
      message: 'You were signed out!',
    };
  }
}
