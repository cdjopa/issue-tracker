import { Injectable } from '@nestjs/common';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { pool } from 'src/db';
import { Issue } from './entities/issue.entity';

@Injectable()
export class IssuesService {
  async create(createIssueDto: CreateIssueDto) {
    const {
      summary,
      description,
      related_project,
      assigned_to,
      priority,
      issue_type,
      target_resolution_date,
      created_by,
    } = createIssueDto;
    try {
      const { rows } = await pool.query(
        `
      INSERT INTO
        issues (
          issue_key,
          summary,
          description,
          related_project,
          assigned_to,
          priority,
          issue_type,
          target_resolution_date,
          created_on,
          created_by,
          identified_date
        )
      VALUES
        (
          (
            (
              SELECT
                (project_key)
              FROM
                projects
              WHERE
                projects.id = $1
            ) || '-' || (
              SELECT
                COUNT(*)
              FROM
                issues
              WHERE
                related_project = $1
            )
          ),
          $2,
          $3,
          $1,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10
        ) RETURNING id
    `,
        [
          related_project,
          summary,
          description,
          assigned_to,
          priority,
          issue_type,
          target_resolution_date,
          new Date().toISOString(),
          created_by,
          new Date().toISOString(),
        ],
      );
      return rows[0];
    } catch (error) {
      console.error('Error creating an issues');
      throw new Error(error);
    }
  }

  async findAll(): Promise<Issue[]> {
    try {
      const { rows } = await pool.query(`SELECT * FROM issues`);
      return rows;
    } catch (error) {
      console.error('Error finding all issues');
      throw new Error(error);
    }
  }

  async findOne(id: string): Promise<Issue | undefined> {
    try {
      const { rows } = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
        id,
      ]);
      return rows[0];
    } catch (error) {
      console.error('Error finding an issues');
      throw new Error(error);
    }
  }

  async update(issue_id: string, updateIssueDto: UpdateIssueDto) {
    try {
      const updateFields = Object.keys(updateIssueDto)
        .map((key, idx) => {
          return `${key} = $${idx + 2}`;
        })
        .join(', ');
      const { rows } = await pool.query(
        `
      UPDATE issues 
      SET ${updateFields}
      WHERE issues.id = $1 
      RETURNING issues.*
      `,
        [issue_id, ...Object.values(updateIssueDto)],
      );
      return rows[0];
    } catch (error) {
      console.error('Error updating a issue');
      throw new Error(error);
    }
  }

  async remove(id: string) {
    try {
      const { rows } = await pool.query(
        `DELETE FROM issues WHERE id = $1 RETURNING *`,
        [id],
      );
      return rows[0];
    } catch (error) {
      console.error('Error deleting an issues');
      throw new Error(error);
    }
  }
}
