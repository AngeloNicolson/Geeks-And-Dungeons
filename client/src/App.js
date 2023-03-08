import { Routes, Route } from "react-router-dom";
import CreateForum from "./components/CreateForumPost";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<CreateForum />} />
      </Routes>
    </div>
  );
};

export default App;
