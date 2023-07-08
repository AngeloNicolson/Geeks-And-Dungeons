const pool = require("../../../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/
const getSinglePostSQL = `
SELECT t.thread_id, t.thread_title, t.thread_text, t.created_at, t.topic_id, u.username AS author_username
FROM thread t
JOIN users u ON t.author = u.id
WHERE t.thread_id = $1`;

const getPostsSQL = `
SELECT t.thread_id, t.thread_title, t.thread_text, t.created_at, t.updated_at, t.topic_id, u.username AS author_username
FROM thread t
JOIN users u ON t.author = u.id`;
/* 
-----------------------------------
       REPOSITORY FUNCTIONS
-----------------------------------
*/
const getSingleThread = async (thread_id) => {
  try {
    const Pool = await pool();
    const values = [thread_id];
    const result = await Pool.query(getSinglePostSQL, values);
    const forumPost = result.rows[0];

    if (!forumPost) {
      throw new Error("Thread not found");
    }

    return forumPost;
  } catch (error) {
    throw new Error("Error getting thread");
  }
};

const getThreads = async () => {
  try {
    const Pool = await pool();

    const result = await Pool.query(getPostsSQL);
    return result.rows;
  } catch (error) {
    throw new Error("Error getting threads");
  }
};
module.exports = { getThreads, getSingleThread };
