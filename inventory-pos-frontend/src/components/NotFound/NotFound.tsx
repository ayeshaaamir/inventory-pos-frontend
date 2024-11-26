import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/dashboard");
  };

  return (
    <Box className="p-6" textAlign="center">
      <Typography variant="h3" color="error" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleNavigateHome}>
        Go to Dashboard
      </Button>
    </Box>
  );
};

export default NotFound;
