import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Container,
  Typography,
  Link,
  Card,
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ pt: 20, pb: "100px", textAlign: "center" }}>
      <Card sx={{ maxWidth: "480px", mx: "auto" }}>
        <CardContent>
          <Typography variant="h5" component="h2" sx={{ fontWeight: "600" }}>
            404 Page not found!
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>
            Nothing to see here... This is not the route you are looking for!
          </Typography>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Link
            onClick={() => navigate("/login")}
            sx={{ cursor: "pointer", mb: 1 }}
          >
            Back
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};

export default NotFound;
