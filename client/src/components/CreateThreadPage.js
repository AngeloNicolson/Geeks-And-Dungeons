import React from "react";

// PAGE ELEMENTS
import Navigation from "./Navigation/Navigation.js";
import TopicTitle from "./Topics/TopicTitle.js";
import CreateThread from "./CreateThread.js";

// STYLES
import "./CreateThreadPage.css";

function CreateThreadPage() {
  return (
    <>
      <Navigation />
      <h1>Create thread</h1>
      <TopicTitle />
      <CreateThread />
    </>
  );
}
export default CreateThreadPage;
