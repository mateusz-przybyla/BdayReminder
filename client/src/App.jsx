import React, { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Birthday from "./components/Birthday";
import CreateArea from "./components/CreateArea";

//import { getList, setItem } from "./services/list";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/data");
        setData(response.data.birthdays);

        //console.log(response.data.birthdays);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchAPI();
  }, [data]);

  const deleteBirthday = async (id) => {
    console.log("Delete");
    console.log(id);

    try {
      await axios.delete(`http://localhost:8080/api/data/${id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1>Birthdays:</h1>

      <hr />

      <h2>List:</h2>
      {data.map((bdayItem, index) => {
        return (
          <Birthday
            key={index}
            id={bdayItem.id}
            person={bdayItem.person}
            onDelete={deleteBirthday}
          />
        );
      })}

      <CreateArea />
    </>
  );
}

export default App;
