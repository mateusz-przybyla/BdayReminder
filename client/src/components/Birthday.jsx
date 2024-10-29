import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

function Birthday(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="">
      <h1>{props.id}</h1>
      <p>{props.firstName}</p>
      <p>{props.lastName}</p>
      <p>{props.birthdate}</p>
      <p>{props.comment}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Birthday;
