const pool = require("../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/
const getSinglePostSQL = `
SELECT thread_id, thread_title, thread_text, created_at, topic_id, author 
FROM thread 
WHERE thread_id = $1`;

const getPostsSQL = `
SELECT thread_id,
thread_title,
created_at,
topic_id,
author
FROM thread`;
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
