import React, { useState } from "react";

import TopicCard from "../Topics/TopicCard";
import TopicCardList from "../Topics/TopicCardList";

//Importing mock data until I understand how im going to make this work
import topic_data from "../../MockData/topicMockData";

// The segment is in control of the title and taking in the card categories
const Segment = ({ title }) => {
  const [topiccards, setTopicCard] = useState(topic_data);
  return (
    <div>
      <p>{title}</p>
      <TopicCardList topiccards={topiccards} />
    </div>
  );
};

export default Segment;
