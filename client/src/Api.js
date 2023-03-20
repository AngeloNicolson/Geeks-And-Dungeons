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

  createThread: async (title, text, topic, userID) => {
    const body = {
      thread_title: title,
      thread_text: text,
      topic_id: topic,
      author: userID,
    };

    await fetch(`${process.env.REACT_APP_API_URL}/api/new-thread`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  },
};

export default api;
