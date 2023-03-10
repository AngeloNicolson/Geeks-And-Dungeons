import { Routes, Route } from "react-router-dom";

import CreateThreadPage from "./Pages/CreateThread/CreateThreadPage";
// import "./normalize.css";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<CreateThreadPage />} />
      </Routes>
    </div>
  );
};

export default App;
