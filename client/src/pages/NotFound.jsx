import React from "react";
import { useNavigate } from "react-router-dom";

import { Container, Typography, Link } from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ pt: 20, textAlign: "center" }}>
      <Typography>
        Nothing to see here... This is not the route you are looking for!
      </Typography>
      <Link onClick={() => navigate("/login")} sx={{ cursor: "pointer" }}>
        Back
      </Link>
    </Container>
  );
};

export default NotFound;
