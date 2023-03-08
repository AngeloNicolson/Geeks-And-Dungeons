const Pool = require("pg").Pool;

let pool = null;

async function get_pool() {
  if (pool !== null) {
    return pool;
  }
  pool = new Pool({});

  await pool.connect();

  return pool;
}

module.exports = get_pool;
