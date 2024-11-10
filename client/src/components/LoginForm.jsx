import React, { useState } from "react";
import { Box, TextField, Fab, Typography, Divider, Link } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const LoginForm = () => {
  const [unregistered, setAsUnregistered] = useState(false);

  const toggleAuth = () =>
    unregistered ? setAsUnregistered(false) : setAsUnregistered(true);

  const handleChange = () => {};

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
    <Box component="form" noValidate autoComplete="off" sx={loginFormStyle}>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
        {unregistered ? "Sign up" : "Sign In"}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <TextField
        label="email"
        type="email"
        margin="dense"
        fullWidth
        name="email"
        value=""
        onChange={handleChange}
        required
      ></TextField>
      <TextField
        label="password"
        type="password"
        margin="dense"
        fullWidth
        name="password"
        value=""
        onChange={handleChange}
        required
      ></TextField>
      {unregistered && (
        <TextField
          label="confirm password"
          type="password"
          margin="dense"
          fullWidth
          name="confirmedPassword"
          value=""
          onChange={handleChange}
          required
        ></TextField>
      )}

      <Typography sx={{ fontSize: "13px", mt: 2, color: "#758694" }}>
        {unregistered ? "Already have an account? " : "New to Bday Reminder? "}
        <Link
          onClick={toggleAuth}
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
