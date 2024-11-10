import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

const isAuthenticated = false;

const PublicRoutes = () => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="/*" element={<Navigate to="/login" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

const PrivateRoutes = () => {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="profile" element={<Profile />} />

        <Route path="/*" element={<Navigate to="/profile" replace />} />
      </Routes>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<PrivateRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
