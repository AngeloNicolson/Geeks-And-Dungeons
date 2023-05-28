const Pool = require("pg").Pool;
let pool = null;

const user = process.env.PGDATABASE;
const password = process.env.PGPASSWORD;
async function get_pool() {
  if (pool !== null) {
    return pool;
  }
  pool = new Pool({
    /*
    -------------------------------------------------------
    // USER and PASSWORD NOT WORKING FROM .env file
    // need a way to get these variables from .env to here
    -------------------------------------------------------
   */
    user: "postgres",
    password: "password",
  });

  await pool.connect();

  return pool;
}

module.exports = get_pool;
