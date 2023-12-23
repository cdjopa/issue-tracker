const { users } = require('../src/data/user.placeholder.js');
const { projects } = require('../src/data/project.placeholder.js')
const bcrypt = require('bcrypt');
const { pool } = require('./db.js');


async function installExtensions() {
  const { rows } = await pool.query(
    ` 
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    `
  )
}

async function createUsersTable() {
  try {
    await pool.query(
      `
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_by TEXT NOT NULL,
      created_on TEXT NOT NULL,
      role TEXT NOT NULL
    )`
    )
  } catch (error) {
    console.error('Error creating users table')
    throw new Error(error)
  }
  // console.log(`created table ${rows.length ? false : true}`)
}

async function createUsersProjectsTable() {
  try {
    await pool.query(
      `
    CREATE TABLE IF NOT EXISTS users_projects (
      user_id UUID NOT NULL,
      project_id UUID NOT NULL,
      PRIMARY KEY (user_id, project_id)
    )
    `
    )
  } catch (error) {
    console.error('Error creating users_projects table')
    throw new Error(error)
  }
}

async function createIssuesTable() {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS issues (
    id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
    issue_key TEXT NOT NULL,
    summary TEXT NOT NULL,
    description TEXT,
    identified_date TEXT NOT NULL,
    related_project UUID NOT NULL REFERENCES projects(id),
    assigned_to UUID REFERENCES users(id),
    priority TEXT,
    issue_type TEXT,
    target_resolution_date TEXT,
    actual_resolution_date TEXT,
    resolution_summary TEXT,
    created_on TEXT NOT NULL,
    created_by UUID NOT NULL references users(id)
      );
      `
    )
  } catch (error) {
    console.error('Error creating issues table')
    throw new Error(error)
  }
}

async function createProjectsTable() {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT uuid_generate_v4() NOT NULL PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        project_key TEXT NOT NULL,
        summary TEXT,
        start_date TEXT NOT NULL,
        target_end_date TEXT,
        actual_end_date TEXT,
        created_on TEXT NOT NULL,
        created_by UUID NOT NULL REFERENCES users(id)
      );
      `
    )
  } catch (error) {
    console.error('Error creating projects table')
    throw new Error(error)
  }
}

async function seedUsers() {
  console.log('seeding users...')
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const { rows } = await pool.query(
        `
        INSERT INTO
        users 
          (
            name,
            username,
            email,
            password,
            created_by,
            created_on,
            role
          )
        values
          (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7
          )
        ON CONFLICT DO NOTHING RETURNING users.id
        `,
        [
          user.name,
          user.username,
          user.email,
          hashedPassword,
          user.created_by,
          new Date().toISOString(),
          user.role,
        ],
      );
      return rows[0];
    }),
  );
  console.log(
    `Inserted ${insertedUsers.filter((users) => users).length} users`,
  );
}

async function seedProjects() {
  const insertedProjects = await Promise.all(
    projects.map(async (project) => {
      const { rows } = await pool.query(`
        INSERT INTO projects 
        (name, summary, start_date, created_by, target_end_date, created_on, project_key)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT DO NOTHING
        RETURNING projects.id
      `, [
        project.name,
        project.summary,
        project.start_date,
        project.created_by,
        project.target_end_date,
        new Date().toISOString(),
        project.project_key
      ])
      return rows[0]
    })
  )
  console.log(
    `Inserted ${insertedProjects.filter((project) => project).length} projects`
  )
}

async function createTables() {
  await createUsersTable()
  await createProjectsTable()
  await createUsersProjectsTable()
  await createIssuesTable()

}
async function seedTables() {
  await seedUsers();
  // await seedProjects();
}

async function seed() {
  await installExtensions()
  await createTables()
  await seedTables()
}

async function main() {
  seed()
}

// main();

module.exports = { seed }

