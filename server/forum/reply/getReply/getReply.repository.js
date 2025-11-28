const pool = require("../../../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/
const getRepliesSQL = `
SELECT reply_id, reply_text, created_at, thread_id, author 
FROM reply 
WHERE thread_id = $1`;

/* 
-----------------------------------
       REPOSITORY FUNCTION
-----------------------------------
*/
const getReplies = async (thread_id) => {
  try {
    const Pool = await pool();
    const values = [thread_id];
    const result = await Pool.query(getRepliesSQL, values);
    const replies = result.rows;

    if (!replies) {
      throw new Error("Reply not found");
    }

    return replies;
  } catch (error) {
    throw new Error("Error getting replies");
  }
};

module.exports = { getReplies };
