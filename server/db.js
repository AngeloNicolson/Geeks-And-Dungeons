const Pool = require("pg").Pool;
require("dotenv").config();

let pool = null;

async function get_pool() {
  if (pool !== null) {
    return pool;
  }
  pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  });

  await pool.connect();

  return pool;
}

module.exports = get_pool;
