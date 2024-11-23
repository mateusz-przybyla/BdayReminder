import React from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import useAuth from "./hooks/useAuth";

import "./App.css";

const App = () => {
  const { loggedIn, setLoggedIn, logout } = useAuth();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <Header isAuthenticated={loggedIn} handleLogout={logout} />
                <Outlet />
                <Footer />
              </>
            }
          >
            <Route
              path="/login"
              element={
                loggedIn ? (
                  <Navigate replace to="/home" />
                ) : (
                  <Authentication setLoggedIn={setLoggedIn} />
                )
              }
            />
            <Route
              path="/home"
              element={!loggedIn ? <Navigate replace to="/login" /> : <Home />}
            />
            <Route
              path="/profile"
              element={
                !loggedIn ? <Navigate replace to="/login" /> : <Profile />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
