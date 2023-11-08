import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDto } from './dto/updateUser.dto';
import { lastValueFrom } from 'rxjs';
import { UserMessagePattern } from '../../../utils/user-message-pattern.util';

@Injectable()
export class UserService {
  constructor(@Inject('USER') private readonly userClient: ClientProxy) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    return await lastValueFrom(
      this.userClient.send(
        { cmd: UserMessagePattern.create_user },
        { createUserDto },
      ),
    );
  }

  async updateUser(
    id: string | number,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    return await lastValueFrom(
      this.userClient.send(
        { cmd: UserMessagePattern.update_user },
        {
          id,
          updateUserDto,
        },
      ),
    );
  }

  async findUserById(id: string | number): Promise<any> {
    return await lastValueFrom(
      this.userClient.send({ cmd: UserMessagePattern.find_user }, { id }),
    );
  }

  async findUsers(
    searchParams: Partial<{
      email: string;
      display_name: string;
    }>,
  ): Promise<any> {
    return await lastValueFrom(
      this.userClient.send(
        { cmd: UserMessagePattern.find_users },
        {
          ...searchParams,
        },
      ),
    );
  }

  async removeUser(id: string | number): Promise<any> {
    return await lastValueFrom(
      this.userClient.send({ cmd: UserMessagePattern.remove_user }, { id }),
    );
  }
}
