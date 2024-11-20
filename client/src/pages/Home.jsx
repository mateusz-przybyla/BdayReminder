import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Link,
  Chip,
} from "@mui/material";

import useAuth from "../hooks/useAuth";
import useTime from "../hooks/useTime";
import useNameday from "../hooks/useNameday";

import { currentDay, currentMonth, currentYear } from "../utils/date&time";

const Home = () => {
  const navigate = useNavigate();
  const user = useAuth();
  const currentTime = useTime();
  const namedays = useNameday();

  const birthdaysToday = 3;

  return (
    <Container sx={{ pt: 20, pb: "100px" }}>
      <Card sx={{ maxWidth: 480, margin: "auto", textAlign: "center" }}>
        <CardContent>
          <Typography
            variant="h5"
            component="h1"
            sx={{ fontWeight: 600, color: "#374954" }}
          >
            Hello {user.username}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>
            {currentDay}-{currentMonth}-{currentYear}, {currentTime.time}
          </Typography>
          <Divider>
            <Chip
              sx={{ my: 3, fontSize: 16, color: "#374954" }}
              label="Today's Namedays"
              size="large"
            />
          </Divider>
          <Typography sx={{ fontWeight: 600 }}>
            {namedays.todayNameday}
          </Typography>
          <Divider>
            <Chip
              sx={{ my: 3, fontSize: 16, color: "#374954" }}
              label="Today's Birthdays"
              size="large"
            />
          </Divider>
          <Typography sx={{ fontWeight: 600 }}>
            {birthdaysToday}/100 birthdays on your list. See more on{" "}
            <Link
              onClick={() => navigate("/profile")}
              sx={{ cursor: "pointer", fontWeight: 700 }}
            >
              Profile
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
