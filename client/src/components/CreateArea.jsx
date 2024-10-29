import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function CreateArea(props) {
  const [itemInput, setItemInput] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    comment: "",
  });

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

  return (
    <form onSubmit={submitBirthday}>
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
        name="birthdate"
        onChange={handleChange}
        type="date"
        value={itemInput.birthdate}
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
