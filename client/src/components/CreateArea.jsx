import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

function CreateArea() {
  const [itemInput, setItemInput] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="text"
        value={itemInput}
        placeholder="new"
      />
      <button type="submit">
        <AddIcon />
      </button>
    </form>
  );
}

export default CreateArea;
