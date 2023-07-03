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
RETURNING username, auth0_id
`;
const getUserProfileByUsernameSQL = "SELECT * FROM users WHERE auth0_id = $1";

/* 
-----------------------------------
           REPOSITORIES
-----------------------------------
*/
// Retrieve user profile by username
const getUserProfileById = async (auth0_id) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    const values = [auth0_id];

    const result = await client.query(getUserProfileByUsernameSQL, values);
    client.release();

    return result.rows;
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving user profile");
  }
};

// Update user profile by username
const updateUserProfileByUsername = async (username, auth0_id) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    const values = [username, auth0_id];

    const newProfile = await client.query(
      updateUserProfileByUsernameSQL,
      values
    );
    client.release();

    return newProfile.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user profile");
  }
};

module.exports = { getUserProfileById, updateUserProfileByUsername };
