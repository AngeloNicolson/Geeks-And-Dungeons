/* 
----------------------------------------
      ONE FILE TO RULE THEM ALL
----------------------------------------
*/
// This is where all the fetches take place.
// One file to contain all interation with the server side.

const api = {
  createForumPost: async (text, topic, userID) => {
    const body = { post_text: text, topic: topic, author: userID };

    await fetch(`${process.env.REACT_APP_API_URL}/api/new-forum`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  },
};

export default api;
