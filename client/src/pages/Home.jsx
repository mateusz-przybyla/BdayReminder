import React, { useState, useEffect } from "react";
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

import { getTodayNameday } from "../services/nameday";
import useAuth from "../hooks/useAuth";
import useTime from "../hooks/useTime";
import { currentDay, currentMonth, currentYear } from "../utils/date&time";

const Home = () => {
  const [todayNameday, setTodayNameday] = useState("No Name Day today.");

  const navigate = useNavigate();
  const user = useAuth();
  const currentTime = useTime();

  const birthdaysToday = 3;

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
          <Typography sx={{ fontWeight: 600 }}>{todayNameday}</Typography>
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
