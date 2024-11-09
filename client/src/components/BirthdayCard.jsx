import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Fab,
  Typography,
} from "@mui/material";
import EditModal from "./EditModal";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

function BirthdayCard(props) {
  const [isExpanded, setExpanded] = useState(false);

  const handleDeleteClick = () => {
    props.onDelete(props.birthday.id);
  };

  const sumbitUpdatedBirthday = (updatedBirthday) => {
    props.onEdit(updatedBirthday);
  };

  const bdayDay = parseInt(props.birthday.birthdate.substring(8, 10));
  const bdayMonth = parseInt(props.birthday.birthdate.substring(5, 7));
  const bdayYear = parseInt(props.birthday.birthdate.substring(0, 4));

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

  const expand = () => {
    isExpanded === false ? setExpanded(true) : setExpanded(false);
  };

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
            {props.birthday.birthdate} • (Age: {age})
          </Typography>
          <Typography gutterBottom variant="h6" sx={{ mb: 0 }}>
            {props.birthday.firstName} {props.birthday.lastName}
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
            {props.birthday.comment}
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
          <EditModal birthday={props.birthday} onEdit={sumbitUpdatedBirthday} />
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default BirthdayCard;
