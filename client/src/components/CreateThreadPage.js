import React, { useState } from "react";
import TopicCardList from "./Topics/TopicCardList";
import "./CreateThreadPage.css";
import Navigation from "./Navigation/Navigation.js";

//Importing mock data until I understand how im going to make this work
import topic_data from "../MockData/topicMockData";

function CreateThreadPage() {
  const [topiccards, setTopicCard] = useState(topic_data);
  return (
    <>
      <Navigation />
      <TopicCardList topiccards={topiccards} />
    </>
  );
}
export default CreateThreadPage;
