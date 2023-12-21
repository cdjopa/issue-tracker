import { Injectable } from '@nestjs/common';
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

  async findOne(project_id: string): Promise<Project | undefined> {
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

  async update(project_id: string, updateProjectDto: UpdateProjectDto) {
    try {
      const updateFields = Object.keys(updateProjectDto)
        .map((key, idx) => {
          return `${key} = $${idx + 2}`;
        })
        .join(', ');

      const { rows } = await pool.query(
        `
      UPDATE projects 
      SET ${updateFields}
      WHERE projects.id = $1 
      RETURNING projects.*
      `,
        [project_id, ...Object.values(updateProjectDto)],
      );
      return rows[0];
    } catch (error) {
      console.error('Error updating a project');
      throw new Error(error);
    }
  }

  async remove(project_id: string) {
    try {
      const { rows } = await pool.query(
        `
        DELETE FROM projects WHERE id = $1
        RETURNING projects.*
        `,
        [project_id],
      );
      return rows[0];
    } catch (error) {
      console.error('Error deleting a project');
      throw new Error(error);
    }
  }
  async findUsers(project_id: string): Promise<UUID[]> {
    const { rows } = await pool.query(
      `
    SELECT user_id FROM users_projects WHERE project_id = $1
    `,
      [project_id],
    );
    return rows.map((values) => values.user_id);
  }

  async addUsers(project_id: string, users: string[]): Promise<UUID[]> {
    // create client to allow use of transaction
    const client = await pool.connect();
    try {
      // start postgres transaction
      await client.query('BEGIN');
      const inserted = await Promise.all(
        // for every requested user, try inserting into the project
        await users.map(async (user_id) => {
          const { rows } = await client.query(
            `INSERT INTO users_projects (project_id, user_id) VALUES ($1, $2)
            ON CONFLICT DO NOTHING
            RETURNING user_id
             `,
            [project_id, user_id],
          );
          // return all successful inserts
          return rows[0];
        }),
      );
      // reformat result to return array of successful insert user UUID
      await client.query('COMMIT');
      return inserted
        .filter((values) => values && values.user_id)
        .map((values) => values.user_id);
    } catch (error) {
      // undo partial inserts if some failed
      client.query('ROLLBACK');
      console.error('Error adding users to project');
      throw new Error(error);
    } finally {
      // console.log('releasing client');
      client.release();
    }
  }
  async removeUsers(project_id: string, users: string[]): Promise<UUID[]> {
    // create client to allow use of transaction
    const client = await pool.connect();
    try {
      // start postgres transaction
      await client.query('BEGIN');
      const inserted = await Promise.all(
        // for every requested user, try deleting from the project
        await users.map(async (user_id) => {
          const { rows } = await client.query(
            `DELETE FROM users_projects 
            WHERE user_id = $1 AND project_id = $2
            RETURNING user_id
             `,
            [user_id, project_id],
          );
          // return all successful deletions
          return rows[0];
        }),
      );
      // reformat result to return array of successful deletion user UUID
      await client.query('COMMIT');
      return inserted
        .filter((values) => values && values.user_id)
        .map((values) => values.user_id);
    } catch (error) {
      // undo partial inserts if some failed
      client.query('ROLLBACK');
      console.error('Error adding users to project');
      throw new Error(error);
    } finally {
      // console.log('releasing client');
      client.release();
    }
  }
}
