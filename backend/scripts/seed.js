const { users } = require('../src/data/user.placeholder.js');
const bcrypt = require('bcrypt');
const { pool } = require('./db.js');
const { error } = require('console');


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

async function createProjectsTable() {
  try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS projects (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name TEXT UNIQUE NOT NULL,
        summary TEXT UNIQUE NOT NULL,
        start_date TEXT NOT NULL,
        target_end_date TEXT NOT NULL,
        actual_end_date TEXT,
        created_on TEXT NOT NULL,
        created_by TEXT NOT NULL
      )
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

async function createTables() {
  await createUsersTable()
  await createProjectsTable()

}
async function seedTables() {
  await seedUsers();
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

