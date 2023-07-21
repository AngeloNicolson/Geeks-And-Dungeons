import { Routes, Route } from "react-router-dom";

// MIDDLEWARE
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticationGuard } from "./Auth/authentication-guard";

// PAGES
import HomePage from "./components/Pages/Home/Home";
import CreateThreadPage from "./components/Pages/CreateThread/CreateThreadPage";
import ThreadsPage from "./components/Pages/Threads/ThreadsPage";
import Profile from "./components/Pages/Profile/Profile";
import SingleThreadPage from "./components/Pages/Threads/SingleThreadPage";
import { Suspense } from "react";

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
          path="/"
          element={
            <Suspense>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          exact
          path="/createthread"
          element={<AuthenticationGuard component={CreateThreadPage} />}
        />

        <Route
          exact
          path="/threads"
          element={<AuthenticationGuard component={ThreadsPage} />}
        />

        <Route
          exact
          path="/profile"
          element={<AuthenticationGuard component={Profile} />}
        />
        <Route
          exact
          path="/thread/:id"
          element={<AuthenticationGuard component={SingleThreadPage} />}
        />
      </Routes>
    </div>
  );
};

export default App;
