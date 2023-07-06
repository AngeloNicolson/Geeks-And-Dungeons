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

/* 
-----------------------------------
           REPOSITORIES
-----------------------------------
*/
const deleteThread = async (thread_id) => {
  try {
    const Pool = await get_pool();
    const client = await Pool.connect();

    const values = [thread_id];

    const oldThread = await client.query(deleteThreadSQL, values);

    return oldThread;
  } catch {
    console.error(error);
    throw new Error("Error deleting thread");
  }
};

module.export = { deleteThread };
