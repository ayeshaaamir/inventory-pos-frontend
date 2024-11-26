import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addEmployee } from "../../services/employeeService";
import { EmployeeData } from "../../interfaces/employeeTypes";

interface ErrorResponse {
  error?: string;
  message?: string;
}

const AddEmployeeForm: React.FC = () => {
  const [formData, setFormData] = useState<EmployeeData>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await addEmployee(formData);
      setLoading(false);

      setSnackbarMessage("Employee registered successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err: unknown) {
      setLoading(false);

      if (axios.isAxiosError(err)) {
        const data = err.response?.data as ErrorResponse;
        if (data?.error) {
          setError(data.error);
          setSnackbarMessage(data.error);
        } else if (data?.message) {
          setError(data.message);
          setSnackbarMessage(data.message);
        } else {
          setError("An unexpected error occurred.");
          setSnackbarMessage("An unexpected error occurred.");
        }
      } else {
        setError("An unexpected error occurred.");
        setSnackbarMessage("An unexpected error occurred.");
      }

      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box className="p-6">
      <Typography variant="h4" gutterBottom>
        Add New Employee
      </Typography>
      {error && (
        <Typography color="error" variant="body1" gutterBottom>
          {error}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Box className="mt-4">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Employee"}
          </Button>
        </Box>
      </form>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddEmployeeForm;
