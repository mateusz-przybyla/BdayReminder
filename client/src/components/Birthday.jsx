import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Modal,
  IconButton,
  Fab,
  Typography,
  Box,
} from "@mui/material";
import { TextField, Divider } from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

function Birthday(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [itemInput, setItemInput] = useState({
    id: props.id,
    firstName: props.firstName,
    lastName: props.lastName,
    birthdate: props.birthdate,
    comment: props.comment,
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  function handleDeleteClick() {
    props.onDelete(props.id);
  }

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
    props.onEdit(itemInput);
    event.preventDefault();
  };

  const bdayDay = parseInt(props.birthdate.substring(8, 10));
  const bdayMonth = parseInt(props.birthdate.substring(5, 7));
  const bdayYear = parseInt(props.birthdate.substring(0, 4));

  var customStyle = {
    color: "",
  };

  if (currentMonth === bdayMonth && currentDay === bdayDay) {
    customStyle.color = "green";
  } else if (
    (currentMonth === bdayMonth && currentDay < bdayDay) ||
    currentMonth < bdayMonth
  ) {
    customStyle.color = "blue";
  } else {
    customStyle.color = "red";
  }
  const age = currentYear - bdayYear;

  function expand() {
    isExpanded === false ? setExpanded(true) : setExpanded(false);
  }

  return (
    <Card
      sx={{
        width: 275,
        p: 1,
        m: 1,
        "&:hover": { cursor: "pointer" },
      }}
      style={customStyle}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography
            gutterBottom
            sx={{ color: "text.secondary", fontSize: 14 }}
          >
            {props.birthdate} • (Age: {age})
          </Typography>
          <Typography gutterBottom variant="h6" sx={{ mb: 0 }}>
            {props.firstName} {props.lastName}
          </Typography>
        </div>
        <CardActions sx={{ pb: 0, mb: 0 }}>
          <IconButton
            sx={{ pb: 0, ml: "auto" }}
            onClick={expand}
            aria-label="show more"
            size="small"
          >
            <UnfoldMoreIcon />
          </IconButton>
        </CardActions>
      </CardContent>

      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0 }}>
          <Typography sx={{ color: "text.secondary" }}>
            {props.comment}
          </Typography>
        </CardContent>
        <CardActions>
          <Fab
            onClick={handleDeleteClick}
            aria-label="delete"
            size="small"
            color="error"
          >
            <DeleteIcon />
          </Fab>
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
                id="updated-firstName"
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
                id="updated-lastName"
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
                id="updated-birthdate"
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
                id="updated-comment"
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
                  aria-label="cancel-modal"
                  onClick={handleClose}
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
          </Modal>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default Birthday;
