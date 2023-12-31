import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { pool } from 'src/db';
import { Project } from 'src/projects/entities/project.entity';

@Injectable()
export class UsersService {
  async findOne(username: string): Promise<User | undefined> {
    try {
      const { rows } = await pool.query(
        `
       SELECT * FROM users WHERE username=$1
    `,
        [username],
      );
      return rows[0];
    } catch (error) {
      console.error('Database error finding one users');
      throw new Error(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const { rows } = await pool.query(`
     SELECT
     users.id,
     users.name,
     users.email,
     users.created_on, 
     users.created_by,
     users.role
     FROM users
    `);
      return rows;
    } catch (error) {
      console.error('Database error finding all users');
      throw new Error(error);
    }
  }

  async getProfile(username: string): Promise<Profile | undefined> {
    const user = await this.findOne(username);
    if (!user) return user;
    const {
      id,
      password,
      created_by,
      created_on,
      role,
      email,
      ...userProfile
    } = user;
    return userProfile;
  }

  async findProjects(id: string): Promise<Project[]> {
    try {
      const { rows } = await pool.query(
        `
        SELECT projects.*
        FROM users
        JOIN users_projects ON users.id = users_projects.user_id
        JOIN projects ON users_projects.project_id = projects. id
        WHERE users.id = $1
        `,
        [id],
      );
      return rows;
    } catch (error) {
      console.log('Error getting user projects');
      throw new Error(error);
    }
  }
}
