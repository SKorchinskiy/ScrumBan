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

  async createUser(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = Object.assign(new UserEntity(), createUserDto, {
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    return this.getPartialUserData(savedUser);
  }

  async updateUser(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Partial<UserEntity>> {
    await this.userRepository.update(id, updateUserDto);
    const user = await this.userRepository.findOne({
      where: {
        user_id: id,
      },
    });
    return this.getPartialUserData(user);
  }

  async findUser(id: number): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        user_id: id,
      },
    });

    return this.getPartialUserData(user);
  }

  async findUsers(
    searchParams: Partial<{
      email: string;
      display_name: string;
    }>,
  ): Promise<Partial<UserEntity>[]> {
    const users = await this.userRepository.find({
      where: {
        ...searchParams,
      },
    });

    return users.map(this.getPartialUserData);
  }

  async removeUser(id: number): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        user_id: id,
      },
    });
    await this.userRepository.remove(user);

    return this.getPartialUserData(user);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<Partial<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const arePasswordsEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordsEqual) {
      throw new Error('credentials doesn`t match');
    }

    return this.getPartialUserData(user);
  }

  getPartialUserData(user: UserEntity): Partial<UserEntity> {
    return {
      user_id: user.user_id,
      display_name: user.display_name,
      email: user.email,
      timezone: user.timezone,
      is_verified: user.is_verified,
    };
  }
}
