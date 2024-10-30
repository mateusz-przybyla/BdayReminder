import React, { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Birthday from "./components/Birthday";
import CreateArea from "./components/CreateArea";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

//import { getList, setItem } from "./services/list";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBirthday = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/data");
        setData(response.data.list);

        //console.log(response.data.list);
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

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "birthdate",
      headerName: "Birthdate",
      width: 150,
      editable: true,
    },
    {
      field: "comment",
      headerName: "Comment",
      width: 150,
      editable: true,
    },
  ];

  const rows = data;

  return (
    <>
      <Header />

      <div className="main">
        <h2>Test List:</h2>
        {data.length > 0 ? (
          data.map((bdayItem, index) => {
            return (
              <Birthday
                key={index}
                id={bdayItem.id}
                firstName={bdayItem.firstName}
                lastName={bdayItem.lastName}
                birthdate={bdayItem.birthdate}
                comment={bdayItem.comment}
                onDelete={deleteBirthday}
              />
            );
          })
        ) : (
          <h2>No results</h2>
        )}

        <CreateArea onAdd={addBirthday} />

        <br />
        <hr />
        <br />
        <h2>Final List:</h2>
        <br />

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            editMode="row"
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>

        <div>
          <br />
          <p>Made with:</p>
          <a href="https://vitejs.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
