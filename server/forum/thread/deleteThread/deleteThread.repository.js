const get_pool = require("../../../db");
/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/
const deleteThreadSQL = `
  DELETE FROM thread
  WHERE thread_id = $1
  RETURNING thread_id`;

const deleteRepliesSQL = `
  DELETE FROM reply
  WHERE thread_id = $1`;
/* 
-----------------------------------
           REPOSITORIES
-----------------------------------
*/
const deleteThread = async (thread_id) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    // Delete all replies associated with the thread
    await client.query(deleteRepliesSQL, [thread_id]);
    const values = [thread_id];
    const oldThread = await client.query(deleteThreadSQL, values);

    return oldThread;
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting thread: " + error.message);
  }
};

module.exports = { deleteThread };
