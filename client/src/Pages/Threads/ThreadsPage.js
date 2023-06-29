// PAGE ELEMENTS
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../../components/Navigation/Navigation.js";
import ThreadFeed from "./ThreadList.js";
import CreatureButton from "../../components/Buttons/CreatureButton/CreatureButton.js";

// STYLES
import styles from "../PageLayout.module.css";
// API
import api from "../../Api";

function ThreadPage() {
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const threadResults = await api.getThreads();
        const threadData = await threadResults.json();
        setThreads(threadData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const navigateToCreateThread = () => {
    navigate("/createthread");
  };
  return (
    <>
      <Navigation />
      <div className={styles.body_inner}>
        <div className={styles.createThreadButton}>
          <CreatureButton onClick={navigateToCreateThread}>
            Creatfe thread
          </CreatureButton>
        </div>

        <div className={styles.div_identification}>
          <ThreadFeed threads={threads} />
        </div>
      </div>
    </>
  );
}

export default ThreadPage;

/*
-------------------------------------
CREDITS
-------------------------------------
- Developers institute
 */
