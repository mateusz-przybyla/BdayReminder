import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Stack,
  Link,
  Toolbar,
  Typography,
  Container,
  AppBar,
  Button,
  Drawer,
  Box,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavList = (props) => {
  const navigate = useNavigate();

  return (
    <Stack
      overflow="auto"
      direction={{ xs: "column", sm: "row" }}
      gap={3}
      width={{ xs: "100%", sm: "initial" }}
      textAlign={{ xs: "center", sm: "initial" }}
      fontSize={{ xs: "22px", sm: "initial" }}
      sx={props.sx}
    >
      {props.loggedIn && (
        <>
          <Link
            onClick={() => {
              navigate("/home");
              props.handleClose?.(false);
            }}
            sx={{
              color: { xs: "#f5ba13", sm: "white" },
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Home
          </Link>
          <Link
            onClick={() => {
              navigate("/profile");

              props.handleClose?.(false);
            }}
            sx={{
              color: { xs: "#f5ba13", sm: "white" },
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Profile
          </Link>
          <Link
            onClick={() => {
              props.handleLogout();
              navigate("/");

              props.handleClose?.(false);
            }}
            sx={{
              color: { xs: "#f5ba13", sm: "white" },
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </Link>
        </>
      )}
    </Stack>
  );
};

const Nav = (props) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {props.loggedIn && (
        <Button
          variant="text"
          onClick={toggleDrawer(true)}
          sx={{ color: "white", display: { xs: "flex", sm: "none" } }}
        >
          <MenuIcon />
        </Button>
      )}

      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor="right"
        sx={{
          display: { xs: "inherit", sm: "none" },
          "& .MuiDrawer-paper": {
            height: "100%",
            width: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button onClick={toggleDrawer(false)}>
            <CloseIcon sx={{ color: "#f5ba13" }} />
          </Button>
        </Box>
        <NavList
          loggedIn={props.loggedIn}
          handleLogout={props.handleLogout}
          handleClose={(state) => setOpen(state)}
        />
      </Drawer>
      <NavList
        loggedIn={props.loggedIn}
        handleLogout={props.handleLogout}
        sx={{
          display: { xs: "none", sm: "inherit" },
        }}
      />
    </>
  );
};

const Header = (props) => {
  return (
    <AppBar component="header" sx={{ background: "#f5ba13" }} position="fixed">
      <Container>
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <CakeIcon fontSize="medium" sx={{ m: "auto" }} />
              <Typography
                variant="h5"
                sx={{
                  display: { xs: "none", sm: "inherit" },
                  fontFamily: "McLaren, cursive",
                }}
              >
                Bday Reminder
              </Typography>
            </Box>
            <Nav loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
