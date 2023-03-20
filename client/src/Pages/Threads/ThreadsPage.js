// PAGE ELEMENTS
import { React } from "react";
import Navigation from "../../components/Navigation/Navigation.js";

// STYLES
import styles from "../PageLayout.module.css";
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

    fetchData();
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
