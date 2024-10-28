import React, { useState } from "react";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

function CreateArea() {
  const [itemInput, setItemInput] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    comment: "",
  });

  const handleChange = (event) => {
    const { itemInput, value } = event.target;

    setItemInput((prevValue) => {
      return {
        ...prevValue,
        [itemInput]: value,
      };
    });
  };

  //async function handleSubmit(event) { //standardowa funkcja
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      person: itemInput,
    };

    setItemInput({ firstName: "", lastName: "", birthdate: "", comment: "" });

    try {
      await axios.post("http://localhost:8080/api/data", userData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="firstName"
        onChange={handleChange}
        type="text"
        value={itemInput.firstName}
        placeholder="First name"
      />
      <input
        name="lastName"
        onChange={handleChange}
        type="text"
        value={itemInput.lastName}
        placeholder="Last name"
      />
      <input
        name="birthDate"
        onChange={handleChange}
        type="date"
        value={itemInput.birthdate}
        placeholder="Birthdate"
      />
      <textarea
        name="comment"
        onChange={handleChange}
        type="text"
        value={itemInput.comment}
        placeholder="Comment"
        rows="3"
      />
      <button type="submit">
        <AddIcon />
      </button>
    </form>
  );
}

export default CreateArea;
