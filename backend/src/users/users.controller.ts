import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/metadata';
import { UUID } from 'crypto';
import { FindProjectsDto } from './dto/find-by.dto';

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

  @Get(':user_id/projects')
  async getUserProjects(
    @Param('user_id', new ParseUUIDPipe({ version: '4' })) user_id: string,
  ) {
    // TODO:
    // use user session to get id instead of passing in as param
    const projects = await this.userService.findProjects(user_id);
    return projects;
  }
}
