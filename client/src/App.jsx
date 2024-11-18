import React, { useState, useEffect } from "react";
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

import { logoutUser, getUserInfo } from "./services/auth";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log("App isLoggedIn?:", loggedIn);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await getUserInfo();

      if (response.status === 200) {
        console.log("Auth info: ", response.status, response.statusText);
        setLoggedIn(true);
      } else {
        console.log(
          "Auth info: ",
          response.response.status,
          response.response.data.error
        );
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setLoggedIn(false);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <>
                <Header
                  isAuthenticated={loggedIn}
                  handleLogout={handleLogout}
                />
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
