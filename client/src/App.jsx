import React, { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Birthday from "./components/Birthday";

//import { getList, setItem } from "./services/list";

function App() {
  const [itemInput, setItemInput] = useState("");
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

  const handleChange = (event) => {
    console.log(event.target.value);
    setItemInput(event.target.value);
  };

  //async function handleSubmit(event) { //standardowa funkcja
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      person: itemInput,
    };

    setItemInput("");

    try {
      await axios.post("http://localhost:8080/api/data", userData);
    } catch (error) {
      console.error(error.message);
    }
  };

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

      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          value={itemInput}
          placeholder="new"
        />
        <button type="submit">Add</button>
      </form>
    </>
  );
}

export default App;
