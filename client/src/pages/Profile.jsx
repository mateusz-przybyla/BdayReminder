import React from "react";
import "../App.css";
import Info from "../components/Info";
import BdayList from "../components/BdayList";
import { Divider, Container } from "@mui/material";

const Profile = () => {
  return (
    <>
      <Container maxWidth="xl" sx={{ pt: "25px", pb: "100px" }}>
        <BdayList />
        <Divider sx={{ my: 3 }} />
        <Info />
      </Container>
    </>
  );
};

export default Profile;
