import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Fab, Zoom, Box, TextField } from "@mui/material";

const AddBdayForm = (props) => {
  const [itemInput, setItemInput] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    comment: "",
  });
  const [isExpanded, setExpanded] = useState(false);

  const expandForm = () => setExpanded(true);
  const closeForm = () => setExpanded(false);

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
    closeForm();
  };

  const addFormStyle = {
    position: "relative",
    maxWidth: "480px",
    margin: "0px auto 20px auto",
    background: "#fff",
    padding: "25px",
    borderRadius: "7px",
    boxShadow: "0 1px 5px rgb(138, 137, 137)",
  };

  const sendFabStyle = {
    position: "absolute",
    right: "20px",
    bottom: "-20px",
    background: "#f5ba13",
    color: "#fff",
  };

  const closeFabStyle = {
    position: "absolute",
    right: "70px",
    bottom: "-20px",
  };

  return (
    <Box
      sx={addFormStyle}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={submitBirthday}
    >
      <TextField
        label={isExpanded ? "first name" : "add birthday"}
        type="text"
        margin="dense"
        fullWidth
        name="firstName"
        value={itemInput.firstName}
        onChange={handleChange}
        onClick={expandForm}
        required
        size={isExpanded ? "normal" : "small"}
      />
      {isExpanded && (
        <>
          <TextField
            label="last name"
            type="text"
            margin="dense"
            fullWidth
            name="lastName"
            value={itemInput.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            label="birthdate"
            type="date"
            margin="dense"
            fullWidth
            name="birthdate"
            value={itemInput.birthdate}
            onChange={handleChange}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="comment"
            multiline
            margin="dense"
            fullWidth
            name="comment"
            onChange={handleChange}
            value={itemInput.comment}
            rows={3}
          />
        </>
      )}
      <Zoom in={isExpanded}>
        <div>
          <Fab type="submit" size="small" sx={sendFabStyle}>
            <AddIcon />
          </Fab>
          <Fab size="small" sx={closeFabStyle} onClick={closeForm}>
            <ClearIcon />
          </Fab>
        </div>
      </Zoom>
    </Box>
  );
};

export default AddBdayForm;
