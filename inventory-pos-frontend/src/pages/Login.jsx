import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Checkbox } from "primereact/checkbox";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import authService from "../services/authService";
import { setCookie } from "../utils/cookieUtils";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checked, setChecked] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { token } = await authService.login(username, password);

      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role_id === 1 ? "admin" : "employee";

      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      setCookie("token", token, 7);

      toast.current.show({
        severity: "success",
        summary: "Login Successful",
        detail: "Welcome back!",
        life: 3000,
      });

      navigate("/dashboard");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);

      toast.current.show({
        severity: "error",
        summary: "Login Failed",
        detail: errorMessage,
        life: 3000,
      });
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <Toast ref={toast} />
      <Card
        className="login-card"
        title="Welcome Back"
        subTitle="Sign in to your account"
      >
        <Divider />
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="username">Username</label>
            <InputText
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <Password
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              toggleMask
              feedback={false}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="field-checkbox">
            <Checkbox
              inputId="rememberMe"
              checked={checked}
              onChange={(e) => setChecked(e.checked)}
            />
            <label htmlFor="rememberMe" className="p-checkbox-label">
              Remember Me
            </label>
          </div>

          <Button
            label="Login"
            icon="pi pi-sign-in"
            onClick={handleLogin}
            className="p-button-rounded p-button-success p-mt-3 login-btn"
            disabled={!username || !password}
          />

          {error && <small className="p-error p-mt-2">{error}</small>}
        </div>
      </Card>
    </div>
  );
};

export default Login;
