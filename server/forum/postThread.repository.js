const get_pool = require("../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/

const createThreadSQL = `INSERT INTO thread (thread_title, thread_text, updated_at, topic_id, author, created_at) VALUES($1, $2, $3, $4, $5, $6) 
RETURNING thread_id, thread_title, thread_text, created_at, updated_at, topic_id, author`;

/* 
-----------------------------------
       REPOSITORY FUNCTIONS
-----------------------------------
*/
const createThread = async (
  thread_title,
  thread_text,
  updated_at,
  topic_id,
  author
) => {
  try {
    const Pool = await get_pool();
    const client = await Pool.connect();

    const created_at = new Date().toISOString();
    const newThread = await client.query(createThreadSQL, [
      thread_title,
      thread_text,
      updated_at,
      topic_id,
      author,
      created_at,
    ]);

    client.release(); // Release client back to the pool for reuse in future requests.

    return newThread.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error creating thread");
  }
};

module.exports = { createThread };
