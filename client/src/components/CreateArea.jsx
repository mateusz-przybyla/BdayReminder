import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Zoom, Box, TextField } from "@mui/material";

function CreateArea(props) {
  const [itemInput, setItemInput] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    comment: "",
  });
  const [isExpanded, setExpanded] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setItemInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitBirthday = (event) => {
    props.onAdd(itemInput);
    setItemInput({
      firstName: "",
      lastName: "",
      birthdate: "",
      comment: "",
    });
    event.preventDefault();
  };

  function expand() {
    setExpanded(true);
  }

  return (
    <form onSubmit={submitBirthday} className="create-bday">
      {isExpanded && (
        <>
          <input
            name="firstName"
            onChange={handleChange}
            type="text"
            value={itemInput.firstName}
            placeholder="first name"
          />
          <input
            name="lastName"
            onChange={handleChange}
            type="text"
            value={itemInput.lastName}
            placeholder="last name"
          />
          <input
            name="birthdate"
            onChange={handleChange}
            type="date"
            value={itemInput.birthdate}
          />
        </>
      )}
      <textarea
        name="comment"
        onChange={handleChange}
        onClick={expand}
        type="text"
        value={itemInput.comment}
        placeholder={isExpanded ? "comment" : "add birthday"}
        rows={isExpanded ? 3 : 1}
      />
      <Zoom in={isExpanded}>
        <Fab type="submit">
          <AddIcon />
        </Fab>
      </Zoom>
    </form>
  );
}

export default CreateArea;
