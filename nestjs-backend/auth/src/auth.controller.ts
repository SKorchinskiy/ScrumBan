import { Controller } from '@nestjs/common';
import { AuthService, Token } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'verify_account' })
  async verifyRegisteredAccount(
    @Payload() { verificationToken }: { verificationToken: string },
  ): Promise<boolean> {
    return await this.authService.verifyRegisteredAccount(verificationToken);
  }

  @MessagePattern({ cmd: 'sign_in' })
  async signUserIn(
    @Payload() payload: { email: string; password: string },
  ): Promise<Token> {
    return await this.authService.signUserIn(payload);
  }

  @MessagePattern({ cmd: 'sign_up' })
  async signUserUp(@Payload() payload: CreateUserDto) {
    return await this.authService.signUserUp(payload);
  }
}
