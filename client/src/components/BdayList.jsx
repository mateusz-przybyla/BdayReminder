import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Birthday from "./Birthday";
import CreateArea from "./CreateArea";
import { Divider, Chip, Box, Container } from "@mui/material";

const months = [
  {
    number: "01",
    name: "January",
  },
  {
    number: "02",
    name: "February",
  },
  {
    number: "03",
    name: "March",
  },
  {
    number: "04",
    name: "April",
  },
  {
    number: "05",
    name: "Mai",
  },
  {
    number: "06",
    name: "June",
  },
  {
    number: "07",
    name: "July",
  },
  {
    number: "08",
    name: "August",
  },
  {
    number: "09",
    name: "Sempember",
  },
  {
    number: "10",
    name: "October",
  },
  {
    number: "11",
    name: "November",
  },
  {
    number: "12",
    name: "December",
  },
];

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
      <CreateArea onAdd={addBirthday} />

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
                  <Birthday
                    key={index}
                    id={bdayItem.id}
                    firstName={bdayItem.firstName}
                    lastName={bdayItem.lastName}
                    birthdate={bdayItem.birthdate}
                    comment={bdayItem.comment}
                    onDelete={deleteBirthday}
                  />
                )
            )}
          </Box>
        </Box>
      ))}
    </>
  );
}

export default BdayList;
