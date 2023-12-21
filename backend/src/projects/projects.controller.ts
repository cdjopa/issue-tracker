import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from 'src/metadata';
import { ProjectSearchParams } from './dto/param.dto';
import { UpdateProjectUsersDto } from './dto/project-users.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) project_id: string,
  ) {
    return await this.projectsService.findOne(project_id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) project_id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(project_id, updateProjectDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) project_id: string,
  ) {
    return await this.projectsService.remove(project_id);
  }

  @Get(':project_id/users')
  async getUsers(
    @Param('project_id', new ParseUUIDPipe({ version: '4' }))
    project_id: string,
  ) {
    return await this.projectsService.getUsers(project_id)
  }

  @Post(':project_id/users')
  async addUsers(
    @Param('project_id', new ParseUUIDPipe({ version: '4' }))
    project_id: string,
    @Body()
    projectUsersDto: UpdateProjectUsersDto,
  ) {
    return await this.projectsService.addUsers(
      project_id,
      projectUsersDto.users,
    );
  }

  @Delete(':project_id/users')
  async removeUsers(
    @Param('project_id', new ParseUUIDPipe({ version: '4' }))
    project_id: string,
    @Body()
    projectUsersDto: UpdateProjectUsersDto,
  ) {
    return await this.projectsService.removeUsers(
      project_id,
      projectUsersDto.users,
    );
    return;
  }
}
