import React from "react";
import CakeIcon from "@mui/icons-material/Cake";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header>
      <h1>
        <CakeIcon fontSize="medium" />
        Bday Reminder
      </h1>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/home">Home</Link>
        <Link to="/profile">Profile</Link>
      </nav>
    </header>
  );
};

export default NavBar;
