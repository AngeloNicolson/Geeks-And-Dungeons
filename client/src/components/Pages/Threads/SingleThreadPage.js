import { useParams } from "react-router-dom";
import ErrorMessage from "../../ErrorHandler/ErrorMessage";
// PAGE ELEMENTS
import { React, useState, useEffect } from "react";
import Navigation from "../../Navigation/Navigation";

// STYLES
import styles from "./SingleThreadPage.module.css";
// API
import api from "../../../Api";

function SingleThreadPage() {
  const [thread, setThread] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    //Abort controller to stop memory leaks from asyc functions
    //https://blog.logrocket.com/complete-guide-abortcontroller-node-js/
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const singleThreadResults = await api.getSingleThread(useParams);
        const singleThreadData = await singleThreadResults.json();
        setThread(singleThreadData);
      } catch (error) {
        if (!abortController.signal.aborted) {
          setErrorMessage(true);
        }
      }
    };
    fetchData();
  });

  return (
    <>
      <Navigation />
      <p>{thread.author}</p>
    </>
  );
}

export default SingleThreadPage;

/*
-------------------------------------
CREDITS
-------------------------------------
 */
