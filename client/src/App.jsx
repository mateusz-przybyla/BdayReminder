import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Authentication from "./pages/Authentication";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";

//const isAuthenticated = false;

const App = () => {
  const [token, setToken] = useState("");

  console.log("App: " + token);
  return (
    <div>
      <Header isAuthenticated={token} />
      <BrowserRouter>
        <Routes>
          {token ? (
            <>
              <Route path="home" element={<Home />} />
              <Route path="profile" element={<Profile />} />
              <Route path="logout" element={<Logout setToken={setToken} />} />

              <Route path="/*" element={<Navigate to="/home" replace />} />
            </>
          ) : (
            <>
              <Route
                path="authentication"
                element={<Authentication setToken={setToken} />}
              />

              <Route
                path="/*"
                element={<Navigate to="/authentication" replace />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
