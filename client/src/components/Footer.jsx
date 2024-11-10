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
    background: "#758694",
  };

  return (
    <Box sx={footerStyle} component="footer">
      <Typography sx={{ color: "#ffffff" }}>
        Copyright ⓒ {currentYear}
      </Typography>
    </Box>
  );
};

export default Footer;
