import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const Layout = (props) => {
  return (
    <>
      <Header loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
