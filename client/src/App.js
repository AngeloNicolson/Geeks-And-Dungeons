import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// MIDDLEWARE
import { AuthenticationGuard } from "./Auth/authentication-guard";

// PAGES
import CreateThreadPage from "./Pages/CreateThread/CreateThreadPage";
import ThreadsPage from "./Pages/Threads/ThreadsPage";

// STYLES
// import "./normalize.css";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/createthread"
          element={<AuthenticationGuard component={CreateThreadPage} />}
        />

        <Route exact path="/" element={<ThreadsPage />} />
      </Routes>
    </div>
  );
};

export default App;
