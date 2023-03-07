const get_pool = require("../db");

const createPost = async (post_text, updated_at, topic, author) => {
  try {
    const pool = await get_pool();
    const created_at = new Date().toISOString();

    const newPost = await pool.query(
      `INSERT INTO post (post_text, created_at, updated_at, topic, author) VALUES($1 $2 $3 $4) 
      RETURNING post_id post_text, created_at, updated_at, topic, author`,
      [post_text, created_at, updated_at, topic, author]
    );

    return newPost.rows[0];
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { createPost };
