import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { loginUser } from "../../services/authService";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../../interfaces/User";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const { token } = await loginUser(username, password);
  
      if (!token) {
        setError("No token returned. Login failed.");
        return;
      }
  
      const decoded = jwtDecode<User>(token);
      const userRole = decoded.role_id;
  
      if (userRole !== undefined && userRole !== null) {
        setRole(userRole);
        Cookies.set("userRole", userRole.toString(), { expires: 7 });
  
        if (userRole === 1) {
          navigate("/dashboard");
        } else if (userRole === 2) {
          navigate("/dashboard");
        } else {
          setError("Invalid role detected. Please contact support.");
        }
      } else {
        setError("User role is missing or invalid.");
      }
    } catch (err) {
      setError((err as Error)?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Typography variant="h4" className="mb-8 font-bold">
        Login
      </Typography>
      <Box className="w-80">
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" className="mt-2">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="mt-4"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>
      </Box>
      {role && (
        <Typography className="mt-4 text-green-500">
          Logged in as {role === 1 ? "Admin" : "Employee"}.
        </Typography>
      )}
    </Box>
  );
};

export default Login;
