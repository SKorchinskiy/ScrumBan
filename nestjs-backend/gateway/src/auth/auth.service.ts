import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from 'src/dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH') private readonly authMicroservice: ClientProxy) {}

  async signIn(payload: { email: string; password: string }) {
    return await lastValueFrom(
      this.authMicroservice.send({ cmd: 'sign_in' }, payload),
    );
  }

  async signUp(payload: CreateUserDto) {
    return await lastValueFrom(
      this.authMicroservice.send({ cmd: 'sign_up' }, payload),
    );
  }
}
