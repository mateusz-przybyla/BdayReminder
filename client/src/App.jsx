import React, { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Birthday from "./components/Birthday";
import CreateArea from "./components/CreateArea";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

  return (
    <>
      <Header />

      <div className="main">
        <h2>List:</h2>
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
      </div>

      <Footer />
    </>
  );
}

export default App;
