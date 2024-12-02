import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import PrimeReact from "primereact/api";

PrimeReact.ripple = true;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
