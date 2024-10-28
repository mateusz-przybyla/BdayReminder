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
    const fetchAPI = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/data");
        setData(response.data.list);

        //console.log(response.data.list);
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
                onDelete={deleteBirthday}
              />
            );
          })
        ) : (
          <h2>No results</h2>
        )}

        <CreateArea />
      </div>

      <Footer />
    </>
  );
}

export default App;
