const pool = require("../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/

const createFormSQL = `INSERT INTO post (post_text, updated_at, topic_id, author, created_at) VALUES($1, $2, $3, $4, $5) 
RETURNING post_id, post_text, created_at, updated_at, topic_id, author`;

const getPostSQL = `SELECT * FROM post`;

/* 
-----------------------------------
       REPOSITORY FUNCTIONS
-----------------------------------
*/
const createPost = async (post_text, updated_at, topic_id, author) => {
  try {
    // Date for inserting into created_at variable, This never to be input by the user.
    const created_at = new Date().toISOString();

    const Pool = await pool();

    const newPost = await Pool.query(createFormSQL, [
      post_text,
      updated_at,
      topic_id,
      author,
      created_at,
    ]);

    return newPost.rows[0];
  } catch (error) {
    throw Error(error);
  }
};

const getAllForumPosts = async () => {
  try {
    const Pool = await pool();

    const result = await Pool.query(getPostSQL);
    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};
module.exports = { createPost, getAllForumPosts };
