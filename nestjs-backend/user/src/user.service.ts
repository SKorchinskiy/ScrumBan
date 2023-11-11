import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>,
  ) {}

  async confirmUserVerified(criteria: {
    user_id: number;
    display_name: string;
    email: string;
  }) {
    return await this.userRepository.update(criteria, {
      is_verified: true,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = Object.assign(new UserEntity(), createUserDto, {
      password: hashedPassword,
    });
    return await this.userRepository.save(user);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return await this.findUser(id);
  }

  async findUser(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        user_id: id,
      },
    });
  }

  async findUsers(
    searchParams: Partial<{
      email: string;
      display_name: string;
    }>,
  ): Promise<UserEntity[]> {
    return await this.userRepository.find({
      where: {
        ...searchParams,
      },
    });
  }

  async removeUser(id: number): Promise<UserEntity> {
    const user = await this.findUser(id);
    await this.userRepository.delete(user);
    return user;
  }
}
