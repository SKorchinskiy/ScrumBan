import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './entities/user.entity';
import { UserMessagePattern } from '../../utils/user-message-pattern.util';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({ cmd: UserMessagePattern.create_user })
  async createUser(
    @Payload() { createUserDto }: { createUserDto: CreateUserDto },
  ): Promise<UserEntity> {
    return await this.userService.createUser(createUserDto);
  }

  @MessagePattern({ cmd: UserMessagePattern.update_user })
  async updateUser(
    @Payload()
    { id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto },
  ): Promise<UserEntity> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @MessagePattern({ cmd: UserMessagePattern.find_user })
  async findUser(@Payload() { id }: { id: number }): Promise<UserEntity> {
    return await this.userService.findUser(id);
  }

  @MessagePattern({ cmd: UserMessagePattern.find_users })
  async findUsers(
    @Payload() searchParams: Partial<{ email: string; display_name: string }>,
  ): Promise<UserEntity[]> {
    return await this.userService.findUsers(searchParams);
  }

  @MessagePattern({ cmd: UserMessagePattern.remove_user })
  async removeUser(@Payload() { id }: { id: number }): Promise<UserEntity> {
    return await this.userService.removeUser(id);
  }
}
