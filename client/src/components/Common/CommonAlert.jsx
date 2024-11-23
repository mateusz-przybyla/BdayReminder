import React from "react";

import Alert from "@mui/material/Alert";

const CommonAlert = (props) => {
  return (
    <Alert
      icon={props.icon}
      variant={props.variant}
      severity={props.severity}
      sx={props.sx}
    >
      {props.content}
    </Alert>
  );
};

export default CommonAlert;
