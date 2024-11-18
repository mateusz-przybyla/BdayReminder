import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Fab, Typography, Divider, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CommonAlert from "../components/Common/CommonAlert";

import { loginUser, registerUser } from "../services/auth";

const LoginForm = (props) => {
  const [unregistered, setAsUnregistered] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const toggleLoginRegister = () =>
    unregistered ? setAsUnregistered(false) : setAsUnregistered(true);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCredentials((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  }, [message]);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const response = await registerUser(credentials);

    if (response.data.error) {
      setMessage(response.data.error);
    } else {
      console.log("LoginForm registered user: ", response.data);
      props.setLoggedIn(true);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const response = await loginUser(credentials);

    if (response.status === 401 || response.status === 400) {
      console.log(
        "LoginForm catch error: ",
        response.response.status,
        response.response.statusText
      );
      setMessage(response.response.statusText);
    } else {
      console.log(
        "LoginForm logged in user info: ",
        response.data.id,
        response.data.username
      );
      props.setLoggedIn(true);
      navigate("/home");
    }
  };

  const loginFormStyle = {
    position: "relative",
    maxWidth: "480px",
    margin: "0px auto 25px auto",
    background: "#fff",
    padding: "25px 25px 35px 25px",
    borderRadius: "7px",
    boxShadow: "0 1px 5px rgb(138, 137, 137)",
  };

  const loginFabStyle = {
    position: "absolute",
    right: "20px",
    bottom: "-20px",
    background: "#f5ba13",
    color: "#fff",
  };

  return (
    <Box
      sx={loginFormStyle}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={unregistered ? handleRegisterSubmit : handleLoginSubmit}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        {unregistered ? "Sign up" : "Sign In"}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {message && (
        <CommonAlert
          content={message}
          severity="error"
          sx={{
            my: 2,
          }}
        />
      )}

      <TextField
        label="email"
        type="email"
        margin="dense"
        fullWidth
        name="username"
        value={credentials.username}
        onChange={handleChange}
        required
      ></TextField>
      <TextField
        label="password"
        type="password"
        margin="dense"
        fullWidth
        name="password"
        value={credentials.password}
        onChange={handleChange}
        required
      ></TextField>

      <Typography sx={{ fontSize: "13px", mt: 2, color: "#758694" }}>
        {unregistered ? "Already have an account? " : "New to Bday Reminder? "}
        <Link
          onClick={toggleLoginRegister}
          sx={{
            color: "#000000",
            textDecoration: "none",
            fontWeight: "600",
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {unregistered ? "Sign in." : "Sign up now."}
        </Link>
      </Typography>
      <Fab type="submit" size="small" sx={loginFabStyle}>
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default LoginForm;
