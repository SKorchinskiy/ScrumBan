import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, EventPattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @EventPattern('send_verification')
  async verifyCreatedUser(@Payload('email') email: string) {
    await this.authService.verifyCreatedUser(email);
  }

  @MessagePattern({ cmd: 'sign_in' })
  async signUserIn(@Payload() payload: { email: string; password: string }) {
    return await this.authService.signUserIn(payload);
  }

  @MessagePattern({ cmd: 'sign_up' })
  async signUserUp(@Payload() payload: CreateUserDto) {
    return await this.authService.signUserUp(payload);
  }

  @MessagePattern({ cmd: 'auth_token' })
  async jwtAuthTokenIssuer(
    @Payload() payload: { email: string; display_name: string },
  ) {
    return await this.authService.jwtAuthTokenIssuer(payload);
  }
}
