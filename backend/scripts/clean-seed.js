const { pool } = require('./db.js')
const { seed } = require('./seed.js')



async function dropAllTables() {
  try {
    await pool.query(
      `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS projects CASCADE;
    `
    )
  } catch (error) {
    console.error('Error dropping tables')
    throw new Error(error)
  }
}

async function main() {
  await dropAllTables()
  await seed()
}

main()