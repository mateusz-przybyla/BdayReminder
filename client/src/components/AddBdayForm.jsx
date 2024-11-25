import React, { useState } from "react";

import { Fab, Zoom, Box, TextField } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";

import CommonAlert from "./Common/CommonAlert";

const AddBdayForm = (props) => {
  const [itemInput, setItemInput] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    comment: "",
  });
  const [validationAlert, setValidationAlert] = useState("");
  const [isExpanded, setExpanded] = useState(false);

  const expandForm = () => setExpanded(true);
  const closeForm = () => {
    setExpanded(false);
    setItemInput({
      firstName: "",
      lastName: "",
      birthdate: "",
      comment: "",
    });
    setValidationAlert("");
  };

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
    event.preventDefault();

    if (!itemInput.firstName || !itemInput.lastName || !itemInput.birthdate) {
      setValidationAlert(
        "first name, last name, birthdate fields cannot be empty!"
      );
      return;
    }

    props.onAdd(itemInput);
    setItemInput({
      firstName: "",
      lastName: "",
      birthdate: "",
      comment: "",
    });
    setValidationAlert("");
    closeForm();
  };

  const addFormStyle = {
    position: "relative",
    maxWidth: "480px",
    margin: "0px auto 25px auto",
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
      {validationAlert && (
        <CommonAlert
          content={validationAlert}
          severity="error"
          sx={{
            mb: 1,
          }}
        />
      )}

      <TextField
        label={isExpanded ? "first name" : "add birthday"}
        name="firstName"
        type="text"
        value={itemInput.firstName}
        onChange={handleChange}
        margin="dense"
        fullWidth
        required
        onClick={expandForm}
        size={isExpanded ? "normal" : "small"}
      />
      {isExpanded && (
        <>
          <TextField
            label="last name"
            name="lastName"
            type="text"
            value={itemInput.lastName}
            onChange={handleChange}
            margin="dense"
            fullWidth
            required
          />
          <TextField
            label="birthdate"
            name="birthdate"
            type="date"
            value={itemInput.birthdate}
            onChange={handleChange}
            margin="dense"
            fullWidth
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            label="comment"
            name="comment"
            multiline
            rows={3}
            value={itemInput.comment}
            onChange={handleChange}
            margin="dense"
            fullWidth
            required
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
