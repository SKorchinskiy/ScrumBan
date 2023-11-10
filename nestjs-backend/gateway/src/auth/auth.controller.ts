import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() payload: { email: string; password: string }) {
    return await this.authService.signIn(payload);
  }

  @Post('sign-up')
  async signUp(@Body() payload: CreateUserDto) {
    return await this.authService.signUp(payload);
  }
}
