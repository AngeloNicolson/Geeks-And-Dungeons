const get_pool = require("../db");

/* 
-----------------------------------
           SQL QUERRIES
-----------------------------------
*/
const updateUserProfileByUsernameSQL = `
INSERT INTO users (username, auth0_id)
VALUES ($1, $2)
ON CONFLICT (auth0_id) DO NOTHING
`;
const getUserProfileByUsernameSQL = "SELECT * FROM users WHERE username = $1";
/* 
-----------------------------------
           REPOSITORIES
-----------------------------------
*/
// Retrieve user profile by username
const getUserProfileByUsername = async (username) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    const values = [username];

    const result = await client.query(getUserProfileByUsernameSQL, values);
    client.release();

    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving user profile");
  }
};

// Update user profile by username
const updateUserProfileByUsername = async (username, auth0Id) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    const values = [username, auth0Id];

    await client.query(updateUserProfileByUsernameSQL, values);
    client.release(); // Release client back to the pool for reuse in future requests.
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user profile");
  }
};

module.exports = { getUserProfileByUsername, updateUserProfileByUsername };
