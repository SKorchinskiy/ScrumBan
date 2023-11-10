import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('USER') private userMicroservice: ClientProxy) {}

  async verifyCreatedUser(email: string) {
    console.log('user verification reached ', email);
    // TODO: send verification email on the provided email
  }

  async signUserIn({ email, password }: { email: string; password: string }) {
    const [user] = await lastValueFrom(
      this.userMicroservice.send({ cmd: 'find_users' }, { email }),
    );
    const arePasswordsEqual = await bcrypt.compare(user.password, password);
    if (arePasswordsEqual) {
      throw new RpcException('Credentials does not match!');
    }

    // TODO: return jwt token instead of user data
    return {
      user_id: user.user_id,
      display_name: user.display_name,
      email: user.email,
    };
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
    await this.verifyCreatedUser(user.email);
    // TODO: return jwt token instead of user data
    return {
      user_id: user.user_id,
      display_name: user.display_name,
      email: user.email,
    };
  }

  async jwtAuthTokenIssuer(payload: { email: string; display_name: string }) {
    console.log('jwt auth token issuer reached with payload ', payload);
  }
}
