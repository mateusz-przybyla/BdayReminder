import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "@mui/material";

const Login = () => {
  return (
    <Container sx={{ pt: 7 }}>
      <LoginForm />
    </Container>
  );
};

export default Login;
