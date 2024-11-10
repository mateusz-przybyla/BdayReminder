import React from "react";
import { Typography, Box } from "@mui/material";
import { currentYear } from "../utils/Date";

const Footer = () => {
  const footerStyle = {
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    padding: "15px 0",
    width: "100%",
    background: "#ccc",
  };

  return (
    <Box sx={footerStyle}>
      <Typography sx={{ color: "#eee" }}>Copyright ⓒ {currentYear}</Typography>
    </Box>
  );
};

export default Footer;
