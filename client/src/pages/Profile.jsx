import React, { useState, useEffect } from "react";

import { Divider, Container, Box, Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import BirthdayCard from "../components/BirthdayCard";
import AddBdayForm from "../components/AddBdayForm";
import CommonBarChart from "../components/Common/CommonBarChart";
import CommonAlert from "../components/Common/CommonAlert";
import Info from "../components/Info";

import {
  fetchItems,
  addItem,
  editItem,
  deleteItem,
} from "../services/birthday";

import months from "../assets/months";

const Profile = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [messageAPI, setMessageAPI] = useState("");

  useEffect(() => {
    const fetchBirthdays = async () => {
      const response = await fetchItems();
      setData(response);
    };
    fetchBirthdays();
  }, []);

  useEffect(() => {
    if (message || messageAPI) {
      setTimeout(() => {
        setMessage("");
        setMessageAPI("");
      }, 3000);
    }
  }, [message, messageAPI]);

  const addBirthday = async (newBirthday) => {
    const response = await addItem(newBirthday);

    if (response.status === 503) {
      setMessageAPI(response.data.error);
    } else {
      setData((prevData) => [...prevData, response]);
      setMessage("Birthday created successfully!");
    }
  };

  const editBirthday = async (updatedBirthday) => {
    const response = await editItem(updatedBirthday, updatedBirthday.id);

    const newData = data.map((item) => {
      if (item.id === updatedBirthday.id) {
        return response;
      }
      return item;
    });

    setData(newData);
    setMessage("Birthday updated successfully!");
  };

  const deleteBirthday = async (id) => {
    await deleteItem(id);
    setData(
      data.filter((birthday) => {
        return birthday.id !== id;
      })
    );
    setMessage("Birthday deleted successfully!");
  };

  const calculateBdaysPerMonth = () => {
    var result = [];
    months.forEach((month) => {
      const itemsPerMonth = data.reduce((accumulator, currentValue) => {
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
            {data.map(
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
      <Info />
    </Container>
  );
};

export default Profile;
