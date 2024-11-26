import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
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
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await addEmployee(formData);
      setLoading(false);
      navigate("/dashboard");
    } catch (err: unknown) {
      setLoading(false);

      if (axios.isAxiosError(err)) {
        console.error("Axios Error:", err.response?.data);

        const data = err.response?.data as ErrorResponse;
        if (data?.error) {
          setError(data.error);
        } else if (data?.message) {
          setError(data.message);
        } else {
          setError("Unexpected error occured.");
        }
      } else {
        setError("Password length must not be at least 6 characters long or email is incorrect.");
      }
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
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          type="password"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
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
    </Box>
  );
};

export default AddEmployeeForm;
