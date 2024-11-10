import React, { useState, useEffect } from "react";
import axios from "axios";
import { Divider, Container, Box, Chip } from "@mui/material";
import BirthdayCard from "../components/BirthdayCard";
import AddBdayForm from "../components/AddBdayForm";
import CommonBarChart from "../components/Common/CommonBarChart";
import CommonAlert from "../components/Common/CommonAlert";
import Info from "../components/Info";
import months from "../assets/months";
import "../App.css";
import CheckIcon from "@mui/icons-material/Check";

const Profile = () => {
  const [data, setData] = useState([]);
  const [addAlert, setAddAlert] = useState(false);
  const [editAlert, setEditAlert] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    const fetchBirthday = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/data");
        setData(response.data.list);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBirthday();
  }, []);

  useEffect(() => {
    if (addAlert || editAlert || deleteAlert) {
      setTimeout(() => {
        setAddAlert(false);
        setEditAlert(false);
        setDeleteAlert(false);
      }, 2000);
    }
  }, [addAlert, editAlert, deleteAlert]);

  const addBirthday = async (newBirthday) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/data",
        newBirthday
      );
      setData((prevData) => [...prevData, response.data]);
      setAddAlert(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const editBirthday = async (updatedBirthday) => {
    try {
      const response = await axios.patch(
        `http://localhost:8080/api/data/${updatedBirthday.id}`,
        updatedBirthday
      );

      const newData = data.map((item) => {
        if (item.id === updatedBirthday.id) {
          return response.data;
        }
        return item;
      });

      setData(newData);
      setEditAlert(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteBirthday = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/data/${id}`);
      setData(
        data.filter((birthday) => {
          return birthday.id !== id;
        })
      );
      setDeleteAlert(true);
    } catch (error) {
      console.error(error.message);
    }
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
    <Container maxWidth="xl" sx={{ mt: "100px", pb: "100px" }}>
      {addAlert && (
        <CommonAlert
          content="Great! New birthday was successfully added to your list."
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{ maxWidth: "800px", mx: "auto" }}
        />
      )}
      {editAlert && (
        <CommonAlert
          content="Done! Birthday was successfully updated."
          icon={<CheckIcon fontSize="inherit" />}
          severity="info"
          sx={{ maxWidth: "800px", mx: "auto" }}
        />
      )}
      {deleteAlert && (
        <CommonAlert
          content="Done! Birthday was successfully deleted."
          icon={<CheckIcon fontSize="inherit" />}
          severity="warning"
          sx={{ maxWidth: "800px", mx: "auto" }}
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
