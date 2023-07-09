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
const deleteThread = async (thread_id, user_id) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    // Check if the authenticated user is the owner of the thread
    const getThreadQuery = `
    SELECT t.thread_id, u.auth0_id
    FROM thread t
    JOIN users u ON t.author = u.id
    WHERE t.thread_id = $1`;

    const threadValues = [thread_id];
    const {
      rows: [thread],
    } = await client.query(getThreadQuery, threadValues);

    if (thread.auth0_id === user_id) {
      // Delete all replies associated with the thread
      await client.query(deleteRepliesSQL, [thread_id]);
      const values = [thread_id];
      await client.query(deleteThreadSQL, values);
      return { success: true, message: "Thread deleted successfully" };
    } else {
      throw Error("Unauthorized");
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

module.exports = { deleteThread };
