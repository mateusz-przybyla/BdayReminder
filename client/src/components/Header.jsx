import React, { useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
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

const NavList = (props) => {
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
      {props.isAuthenticated && (
        <>
          <Link
            href="/home"
            sx={{
              color: { xs: "#f5ba13", sm: "white" },
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Link
            href="/profile"
            sx={{
              color: { xs: "#f5ba13", sm: "white" },
              textDecoration: "none",
            }}
          >
            Profile
          </Link>
          <Link
            href="/logout"
            sx={{
              color: { xs: "#f5ba13", sm: "white" },
              textDecoration: "none",
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
      <Button
        variant="text"
        onClick={toggleDrawer(true)}
        sx={{ color: "white", display: { xs: "flex", sm: "none" } }}
      >
        <MenuIcon />
      </Button>
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
        <NavList isAuthenticated={props.isAuthenticated} />
      </Drawer>
      <NavList
        isAuthenticated={props.isAuthenticated}
        sx={{
          display: { xs: "none", sm: "inherit" },
        }}
      />
    </>
  );
};

const Header = (props) => {
  return (
    <AppBar
      component="header"
      sx={{ background: "#f5ba13" }}
      position={props.isAuthenticated ? "fixed" : "static"}
    >
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
            <Nav isAuthenticated={props.isAuthenticated} />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
