const Pool = require("pg").Pool;

let pool = null;

async function get_pool() {
  if (pool !== null) {
    return pool;
  }
  pool = new Pool({
    user: "postgres",
    password: "password",
    host: "localhost",
    port: 5432,
    database: "gndforum",
  });

  await pool.connect();

  return pool;
}

module.exports = get_pool;
