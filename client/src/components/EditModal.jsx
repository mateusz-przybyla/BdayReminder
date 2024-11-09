import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Modal, Fab } from "@mui/material";
import EditForm from "./EditForm";

const EditModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sumbitUpdatedBirthday = (updatedBirthday) => {
    props.onEdit(updatedBirthday);
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
        aria-labelledby="modal-edit-birthday"
        aria-describedby="modal-edit-birthday-props"
      >
        <div>
          <EditForm
            birthday={props.birthday}
            onEdit={sumbitUpdatedBirthday}
            handleClose={handleClose}
          />
        </div>
      </Modal>
    </>
  );
};

export default EditModal;
