import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/metadata';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  async getAllUsers() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':username/profile')
  async getUser(@Param('username') username: string) {
    const user = await this.userService.getProfile(username);
    return user;
  }
}
