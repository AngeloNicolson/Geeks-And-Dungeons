import { Routes, Route } from "react-router-dom";

import CreateThreadPage from "./Pages/CreateThread/CreateThreadPage";
import ThreadsPage from "./Pages/Threads/ThreadsPage";
// import "./normalize.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/createthread" element={<CreateThreadPage />} />
        <Route exact path="/" element={<ThreadsPage />} />
      </Routes>
    </div>
  );
};

export default App;
