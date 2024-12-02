import React, { useState } from "react";

import { Fab, Typography, Box, TextField, Divider } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";

import CommonAlert from "./Common/CommonAlert";

const EditBdayForm = (props) => {
  const [itemInput, setItemInput] = useState({
    id: props.birthday.id,
    firstName: props.birthday.first_name,
    lastName: props.birthday.last_name,
    birthdate: props.birthday.birthdate,
    comment: props.birthday.comment,
  });
  const [validationAlert, setValidationAlert] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setItemInput((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const sumbitUpdatedBirthday = (event) => {
    event.preventDefault();

    if (!itemInput.firstName || !itemInput.lastName || !itemInput.birthdate) {
      setValidationAlert(
        "first name, last name, birthdate fields cannot be empty!"
      );
      return;
    }

    props.onEdit(itemInput);
    props.handleClose();
  };

  const editFormStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };

  const sendFabStyle = {
    position: "absolute",
    right: "20px",
    bottom: "-20px",
  };

  const closeFabStyle = {
    position: "absolute",
    right: "70px",
    bottom: "-20px",
  };

  return (
    <Box
      sx={editFormStyle}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={sumbitUpdatedBirthday}
    >
      <Typography id="modal-modal-birthday" variant="h5" component="h2">
        Edit birthday data:
      </Typography>
      <Divider sx={{ my: 2 }} />

      {validationAlert && (
        <CommonAlert
          content={validationAlert}
          severity="error"
          sx={{
            my: 1,
          }}
        />
      )}

      <TextField
        label="first name"
        name="firstName"
        type="text"
        value={itemInput.firstName}
        onChange={handleChange}
        margin="dense"
        fullWidth
        required
      />
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
        value={itemInput.comment}
        onChange={handleChange}
        margin="dense"
        fullWidth
      />
      <div>
        <Fab type="submit" size="small" color="primary" sx={sendFabStyle}>
          <SendIcon />
        </Fab>
        <Fab size="small" sx={closeFabStyle} onClick={props.handleClose}>
          <ClearIcon />
        </Fab>
      </div>
    </Box>
  );
};

export default EditBdayForm;
