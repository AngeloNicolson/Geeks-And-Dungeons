import React from "react";

// PAGE ELEMENTS
import Navigation from "./Navigation/Navigation.js";
import TopicTitle from "./Topics/TopicTitle.js";
import CreateThread from "./CreateThread.js";

// STYLES
import "./CreateThreadPage.css";
import styles from "./PageLayout.module.css";

function CreateThreadPage() {
  return (
    <>
      <Navigation />
      <div className={styles.body_inner}>
        <h1>Create thread</h1>
        <TopicTitle />
        <CreateThread />
      </div>
    </>
  );
}
export default CreateThreadPage;
