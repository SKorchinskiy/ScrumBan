import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '../dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Get(':id')
  async findUserById(@Param('id') id: number) {
    return await this.userService.findUserById(id);
  }

  @Get()
  async findUsers(
    @Query()
    search_params: Partial<{
      email: string;
      display_name: string;
    }>,
  ) {
    return await this.userService.findUsers({ ...search_params });
  }

  @Delete(':id')
  async removeUser(@Param('id') id: number) {
    return await this.userService.removeUser(id);
  }
}
