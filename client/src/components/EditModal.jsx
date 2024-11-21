import React, { useState } from "react";

import { Modal, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import EditBdayForm from "./EditBdayForm";

const EditModal = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sumbitUpdatedBirthday = (updatedBirthday) => {
    props.onEdit(updatedBirthday);
  };

  return (
    <div>
      <Fab
        onClick={handleOpen}
        aria-label="edit"
        size="small"
        color="secondary"
      >
        <EditIcon />
      </Fab>
      <Modal open={open} onClose={handleClose}>
        <div>
          <EditBdayForm
            birthday={props.birthday}
            onEdit={sumbitUpdatedBirthday}
            handleClose={handleClose}
          />
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
