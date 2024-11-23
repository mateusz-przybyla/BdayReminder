import React from "react";

import { Divider, Container, Box, Chip } from "@mui/material";

import BirthdayCard from "../components/BirthdayCard";
import AddBdayForm from "../components/AddBdayForm";
import CommonBarChart from "../components/Common/CommonBarChart";
import CommonAlert from "../components/Common/CommonAlert";
import InfoCard from "../components/InfoCard";

import useBirthday from "../hooks/useBirthday";

import months from "../assets/months";

const Profile = () => {
  const {
    birthdays,
    message,
    messageAPI,
    addBirthday,
    editBirthday,
    deleteBirthday,
  } = useBirthday();

  const calculateBdaysPerMonth = () => {
    var result = [];
    months.forEach((month) => {
      const itemsPerMonth = birthdays.reduce((accumulator, currentValue) => {
        currentValue.birthdate.includes(`-${month.number}-`) && accumulator++;
        return accumulator;
      }, 0);

      result.push(itemsPerMonth);
    });
    return result;
  };

  return (
    <Container sx={{ mt: "65px", pt: 3, pb: "100px" }}>
      {message && (
        <CommonAlert
          content={message}
          severity="success"
          sx={{
            maxWidth: "800px",
            position: "fixed",
            top: "80px",
            left: "15px",
            zIndex: 99,
          }}
        />
      )}

      {messageAPI && (
        <CommonAlert
          content={messageAPI}
          severity="error"
          sx={{
            maxWidth: "800px",
            position: "fixed",
            top: "80px",
            left: "15px",
            zIndex: 99,
          }}
        />
      )}

      <AddBdayForm onAdd={addBirthday} />

      {months.map((month) => (
        <Box key={`box${month.number}`}>
          <Divider>
            <Chip sx={{ my: 1 }} label={month.name} size="medium" />
          </Divider>
          <Box
            sx={{ display: "flex", justifyContent: "left", flexWrap: "wrap" }}
          >
            {birthdays.map(
              (bdayItem, index) =>
                bdayItem.birthdate.includes(`-${month.number}-`) && (
                  <BirthdayCard
                    key={index}
                    birthday={bdayItem}
                    onDelete={deleteBirthday}
                    onEdit={editBirthday}
                  />
                )
            )}
          </Box>
        </Box>
      ))}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ maxWidth: 1000, mx: "auto" }}>
        <CommonBarChart
          xAxisData={months.map((month) => month.name)}
          yValues={calculateBdaysPerMonth()}
          yAxisLabel="Amount"
          legendLabel="birthdays/month"
          height={400}
        />
      </Box>
      <Divider sx={{ my: 3 }} />
      <InfoCard />
    </Container>
  );
};

export default Profile;
