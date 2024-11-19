import React from "react";

import { Container } from "@mui/material";

import LoginForm from "../components/LoginForm";

const Authentication = ({ setLoggedIn }) => {
  return (
    <Container sx={{ pt: 20, pb: "100px" }}>
      <LoginForm setLoggedIn={setLoggedIn} />
    </Container>
  );
};

export default Authentication;
