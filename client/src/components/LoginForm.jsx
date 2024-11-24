import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, TextField, Fab, Typography, Divider, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CommonAlert from "../components/Common/CommonAlert";

import { loginUser, registerUser } from "../services/auth";
import { emailValidator, passwordValidator } from "../utils/validators";

const LoginForm = (props) => {
  const [unregistered, setAsUnregistered] = useState(false);
  const [username, setUsername] = useState({
    value: "",
    error: false,
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
  });
  const [messageAPI, setMessageAPI] = useState("");

  const navigate = useNavigate();

  const toggleLoginRegister = () =>
    unregistered ? setAsUnregistered(false) : setAsUnregistered(true);

  const handleUsernameChange = (event) => {
    setUsername({ value: event.target.value, error: false });

    if (emailValidator(event.target.value)) {
      setUsername({
        value: event.target.value,
        error: true,
      });
    } else {
      setUsername({
        value: event.target.value,
        error: false,
      });
    }
  };

  const handlePasswordChange = (event) => {
    setPassword({
      value: event.target.value,
      error: false,
    });

    if (passwordValidator(event.target.value)) {
      setPassword({
        value: event.target.value,
        error: true,
      });
    } else {
      setPassword({
        value: event.target.value,
        error: false,
      });
    }
  };

  useEffect(() => {
    if (messageAPI) {
      setTimeout(() => {
        setMessageAPI("");
      }, 3500);
    }
  }, [messageAPI]);

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    if (!username.value || !password.value) {
      if (!username.value) {
        setUsername({
          value: event.target.value,
          error: true,
        });
      }
      if (!password.value) {
        setPassword({
          value: event.target.value,
          error: true,
        });
      }
      return;
    }

    if (!username.error && !password.error) {
      const response = await registerUser({
        username: username.value,
        password: password.value,
      });

      if (response.status === 403 || response.status === 422) {
        setMessageAPI(response.response.data.error);
      } else {
        props.setLoggedIn(true);
      }
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!username.value || !password.value) {
      if (!username.value) {
        setUsername({
          value: event.target.value,
          error: true,
        });
      }
      if (!password.value) {
        setPassword({
          value: event.target.value,
          error: true,
        });
      }
      return;
    }

    if (!username.error && !password.error) {
      const response = await loginUser({
        username: username.value,
        password: password.value,
      });

      if (response.status === 401 || response.status === 400) {
        setMessageAPI(response.response.statusText);
      } else {
        props.setLoggedIn(true);
        navigate("/");
      }
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
      autoComplete="on"
      onSubmit={unregistered ? handleRegisterSubmit : handleLoginSubmit}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        {unregistered ? "Sign up" : "Sign In"}
      </Typography>
      <Divider sx={{ my: 2 }} />

      {messageAPI && (
        <CommonAlert
          content={messageAPI}
          severity="error"
          sx={{
            my: 2,
          }}
        />
      )}

      <TextField
        label="username"
        name="username"
        type="email"
        value={username.value}
        onChange={handleUsernameChange}
        error={username.error}
        helperText={username.error && "Invalid email address."}
        margin="dense"
        fullWidth
      />
      <TextField
        label="password"
        name="password"
        type="password"
        value={password.value}
        onChange={handlePasswordChange}
        error={password.error}
        helperText={
          password.error && "Password must be at least 3 characters long."
        }
        margin="dense"
        fullWidth
      />

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
