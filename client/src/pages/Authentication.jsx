import React from "react";
import LoginForm from "../components/LoginForm";
import { Container } from "@mui/material";
import PropTypes from "prop-types";

const Authentication = ({ setToken }) => {
  return (
    <Container sx={{ pt: 10 }}>
      <LoginForm setToken={setToken} />
    </Container>
  );
};

Authentication.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Authentication;
