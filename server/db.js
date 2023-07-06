const { Pool } = require("pg");
require("dotenv").config();

let pool = null;

async function get_pool() {
  if (pool !== null) {
    return pool;
  }
  pool = new Pool({ connectionString: process.env.DATABASE_URL });

  await pool.connect();

  return pool;
}

module.exports = get_pool;
