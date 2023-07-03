/* 
----------------------------------------
      ONE FILE TO RULE THEM ALL
----------------------------------------
*/
// This is where all the fetches take place.
// One file to contain all interation with the server side.

const api = {
  getThreads: async () =>
    await fetch(`${process.env.REACT_APP_API_URL}/api/get-threads`),

  createThread: async (title, text, topic, userID, accessToken) => {
    const body = {
      thread_title: title,
      thread_text: text,
      topic_id: topic,
      author: userID,
    };

    return await fetch(`${process.env.REACT_APP_API_URL}/api/new-thread`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
  },

  getUserProfile: async (auth0_id, accessToken) => {
    const results = await fetch(
      `${process.env.REACT_APP_API_URL}/api/profile/${auth0_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return results.json();
  },

  updateUserProfile: async (auth0_id, username, accessToken) => {
    const body = {
      auth0_id: auth0_id,
      username: username,
    };
    await fetch(`${process.env.REACT_APP_API_URL}/api/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
  },
};

export default api;
