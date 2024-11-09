import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import BirthdayCard from "./BirthdayCard";
import AddBdayForm from "./AddBdayForm";
import { Divider, Chip, Box } from "@mui/material";
import months from "../assets/months";
import Chart from "./Chart";

function BdayList() {
  const [data, setData] = useState([]);

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

  const addBirthday = async (newBirthday) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/data",
        newBirthday
      );
      setData((prevData) => [...prevData, response.data]);
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
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
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
                bdayItem.birthdate.substring(5, 7) === month.number && (
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
      <Chart bdayData={data} />
    </>
  );
}

export default BdayList;
