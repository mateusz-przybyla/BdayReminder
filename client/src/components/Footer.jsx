import React from "react";

import { Typography, Box, Link, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

import { currentYear } from "../utils/currentDate";

const Footer = () => {
  const footerStyle = {
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    padding: "8px 0",
    width: "100%",
    background: "#758694",
  };

  return (
    <Box sx={footerStyle} component="footer">
      <Typography sx={{ color: "#ffffff" }}>
        ⓒ {currentYear}, Mateusz Przybyła{" "}
        <Link href="https://github.com/mateusz-przybyla" target="_blank">
          <IconButton>
            <GitHubIcon />
          </IconButton>
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
