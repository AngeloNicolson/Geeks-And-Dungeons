// PAGE ELEMENTS
import { React } from "react";
import Navigation from "../../components/Navigation/Navigation.js";

// STYLES

// API
import api from "../../Api";

function ThreadPage() {
  const fetchData = async () => {
    try {
      const threadResults = await api.getThreads();
      const threadData = await threadResults.json();
      console.log(threadData);
    } catch (error) {
      console.log(error);
    }
    return (
      <>
        <Navigation />
        <div className={styles.body_inner}></div>
      </>
    );
  };
}
export default ThreadPage;

/*
-------------------------------------
CREDITS
-------------------------------------
- Developers institute
 */
