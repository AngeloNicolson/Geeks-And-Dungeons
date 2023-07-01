const { Pool } = require("pg");
const get_pool = require("../db");

// Retrieve user profile by username
const getUserProfileByUsername = async (username) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    const query = "SELECT * FROM users WHERE username = $1";
    const values = [username];
    const result = await client.query(query, values);

    client.release();

    return result.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Error retrieving user profile");
  }
};

// Update user profile by username
const updateUserProfileByUsername = async (username, newProfileData) => {
  try {
    const pool = await get_pool();
    const client = await pool.connect();

    const query = "UPDATE users SET ... WHERE username = $1";
    const values = [username];
    // Construct the query and values based on the new profile data

    const result = await client.query(query, values);

    client.release();

    return result.rowCount > 0;
  } catch (error) {
    console.error(error);
    throw new Error("Error updating user profile");
  }
};

module.exports = { getUserProfileByUsername, updateUserProfileByUsername };
