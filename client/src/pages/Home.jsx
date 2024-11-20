import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Link,
} from "@mui/material";

import { getTodayNameday } from "../services/nameday";
import useAuth from "../hooks/useAuth";
import {
  currentTime,
  currentDay,
  currentMonth,
  currentYear,
} from "../utils/currentDate";

const Home = () => {
  const [todayNameday, setTodayNameday] = useState("No Name Day today.");
  const [time, setTime] = useState(currentTime);

  const navigate = useNavigate();
  const user = useAuth();

  const birthdaysToday = 3;

  setInterval(updateTime, 1000);

  function updateTime() {
    const newTime = new Date().toLocaleTimeString();
    setTime(newTime);
  }

  useEffect(() => {
    async function fetchData() {
      const countryCode = "pl";
      const timezone = "";

      const response = await getTodayNameday(countryCode, timezone);
      const namedays = response.data.nameday.pl;

      namedays && setTodayNameday(namedays);
    }
    fetchData();
  }, []);

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

          <Typography sx={{ color: "#374954" }}>
            {currentDay}-{currentMonth}-{currentYear}, {time}
          </Typography>
          <br />
          <Typography sx={{ fontWeight: 700, color: "#374954" }}>
            --- Today's Namedays ---
          </Typography>
          <br />
          <Typography>{todayNameday}</Typography>
          <br />
          <Typography sx={{ fontWeight: 700, color: "#374954" }}>
            --- Today's Birthdays ---
          </Typography>
          <br />
          <Typography>
            {birthdaysToday} birthdays on your list. See more on{" "}
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
