import React from "react";

import { Card, Typography, CardActions } from "@mui/material";

import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

const InfoCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        mx: "auto",
        background: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      variant="outlined"
    >
      <Typography xs={{ textAlign: "center", mx: "auto" }}>
        Made with:
      </Typography>

      <CardActions>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </CardActions>
    </Card>
  );
};

export default InfoCard;
