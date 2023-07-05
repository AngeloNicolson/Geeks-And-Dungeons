const get_pool = require("../../../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/
const createReplySQL = `
INSERT INTO reply (reply_text, thread_id, created_at, author) 
VALUES ($1, $2, $3, $4) 
RETURNING reply_id, reply_text, created_at, thread_id, author`;

/* 
-----------------------------------
           REPOSITORIES
-----------------------------------
*/
const createReply = async (reply_text, thread_id, author) => {
  try {
    const Pool = await get_pool();
    const client = await Pool.connect();
    const created_at = new Date();

    const values = [reply_text, thread_id, created_at, author];

    const newThread = await client.query(createReplySQL, values);
    client.release(); // Release client back to the pool for reuse in future requests.

    return newThread.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error creating reply");
  }
};

module.exports = { createReply };
