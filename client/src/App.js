import { Routes, Route } from "react-router-dom";
import CreateForum from "./components/CreateForumPost";
import CreateThreadPage from "./components/CreateThreadPage";

const App = () => {
  return (
    <div>
      <Routes>
        {/* <Route exact path="/" element={<CreateForum />} /> */}
        <Route exact path="/" element={<CreateThreadPage />} />
      </Routes>
    </div>
  );
};

export default App;
