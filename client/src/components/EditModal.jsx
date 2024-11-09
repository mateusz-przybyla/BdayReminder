import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, Fab, Typography, Box, TextField, Divider } from "@mui/material";

const EditModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [itemInput, setItemInput] = useState({
    id: props.id,
    firstName: props.firstName,
    lastName: props.lastName,
    birthdate: props.birthdate,
    comment: props.comment,
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
    handleClose();
  };

  return (
    <>
      <Fab
        onClick={handleOpen}
        aria-label="edit"
        size="small"
        color="secondary"
      >
        <EditIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-birthday"
        aria-describedby="modal-modal-edit-birthday-props"
      >
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
            <Fab size="small" aria-label="cancel-modal" onClick={handleClose}>
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
      </Modal>
    </>
  );
};

export default EditModal;
