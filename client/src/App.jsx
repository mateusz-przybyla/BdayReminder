import React from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Info from "./components/Info";
import BdayList from "./components/BdayList";
import { Divider, Container } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="xl" sx={{ pt: "25px", pb: "100px" }}>
        <BdayList />
        <Divider sx={{ my: 3 }} />
        <Info />
      </Container>
      <Footer />
    </>
  );
}

export default App;
