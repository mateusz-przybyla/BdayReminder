import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { Fab, Typography, Box, TextField, Divider } from "@mui/material";

const EditForm = (props) => {
  const [itemInput, setItemInput] = useState({
    id: props.birthday.id,
    firstName: props.birthday.firstName,
    lastName: props.birthday.lastName,
    birthdate: props.birthday.birthdate,
    comment: props.birthday.comment,
  });

  const editFormStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
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

  const sumbitUpdatedBirthday = (event) => {
    event.preventDefault();
    props.onEdit(itemInput);
    props.handleClose();
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
      <TextField
        label="first name"
        type="text"
        margin="dense"
        fullWidth
        name="firstName"
        value={itemInput.firstName}
        onChange={handleChange}
        required
      />
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
      />
      <TextField
        label="comment"
        multiline
        margin="dense"
        fullWidth
        name="comment"
        value={itemInput.comment}
        onChange={handleChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          mt: 2,
        }}
      >
        <Fab
          size="small"
          aria-label="cancel-edit-modal"
          onClick={props.handleClose}
        >
          <ClearIcon />
        </Fab>
        <Fab
          type="submit"
          size="small"
          aria-label="send-updated-data"
          color="primary"
        >
          <SendIcon />
        </Fab>
      </Box>
    </Box>
  );
};

export default EditForm;