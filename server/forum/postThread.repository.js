const pool = require("../db");

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
    // Date for inserting into created_at variable, This never to be input by the user.
    const created_at = new Date().toISOString();

    const Pool = await pool();

    const newThread = await Pool.query(createThreadSQL, [
      thread_title,
      thread_text,
      updated_at,
      topic_id,
      author,
      created_at,
    ]);

    return newThread.rows[0];
  } catch (error) {
    throw Error(error);
  }
};
module.exports = { createThread };
