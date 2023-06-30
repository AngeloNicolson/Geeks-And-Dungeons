import { Routes, Route } from "react-router-dom";

// MIDDLEWARE
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./Auth/authentication-guard";

// PAGES
import CreateThreadPage from "./components/Pages/CreateThread/CreateThreadPage";
import ThreadsPage from "./components/Pages/Threads/ThreadsPage";

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
