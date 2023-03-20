const pool = require("../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/

const getPostSQL = `SELECT * FROM thread`;
/* 
-----------------------------------
       REPOSITORY FUNCTIONS
-----------------------------------
*/
const getAllForumThreads = async () => {
  try {
    const Pool = await pool();

    const result = await Pool.query(getPostSQL);
    return result.rows;
  } catch (error) {
    throw Error(error);
  }
};
module.exports = { getAllForumThreads };
