import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Layout from "./pages/Layout";

import useAuth from "./hooks/useAuth";

import "./App.css";

const App = () => {
  const { loggedIn, setLoggedIn, logout } = useAuth();

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Layout loggedIn={loggedIn} handleLogout={logout} />}
          >
            <Route
              index
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
              element={loggedIn ? <Home /> : <Navigate replace to="/" />}
            />
            <Route
              path="/profile"
              element={loggedIn ? <Profile /> : <Navigate replace to="/" />}
            />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
