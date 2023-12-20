import { ConsoleLogger, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { UUID } from 'crypto';
import { pool } from 'src/db';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  async create(createProjectDto: CreateProjectDto): Promise<UUID> {
    try {
      const { name, summary, start_date, created_by, target_end_date } =
        createProjectDto;

      const { rows } = await pool.query(
        `
        INSERT INTO projects 
        (name, summary, start_date, created_by, target_end_date, created_on)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING projects.id
    `,
        [
          name,
          summary,
          start_date,
          created_by,
          target_end_date,
          new Date().toISOString(),
        ],
      );
      return rows[0];
    } catch (error) {
      console.error('Error creating new project');
      throw new Error(error);
    }
  }

  async findAll(): Promise<Project[]> {
    try {
      const { rows } = await pool.query(`SELECT * FROM projects`);
      return rows;
    } catch (error) {
      console.error('Error finding all projects');
      throw new Error(error);
    }
  }

  async findOne(project_id: UUID): Promise<Project | undefined> {
    try {
      const { rows } = await pool.query(`SELECT * FROM projects WHERE id=$1`, [
        project_id,
      ]);
      return rows[0];
    } catch (error) {
      console.error('Error finding a project');
      throw new Error(error);
    }
  }

  update(project_id: UUID, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${project_id} project`;
  }

  remove(project_id: UUID) {
    return `This action removes a #${project_id} project`;
  }
}
