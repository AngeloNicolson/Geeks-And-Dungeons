const pool = require("../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/
const getSinglePostSQL = `SELECT id, title, content, created_at FROM thread WHERE id = $1`;

const getPostsSQL = `SELECT * FROM thread`;
/* 
-----------------------------------
       REPOSITORY FUNCTIONS
-----------------------------------
*/
const getSingleThread = async () => {
  try {
    const Pool = await pool();
    const values = [id];
    const result = await Pool.query(getSinglePostSQL, values);
    return result.rows;
  } catch (error) {
    throw new Error("Error getting threads");
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
