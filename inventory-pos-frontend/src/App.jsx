import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NotFound from "./pages/Not-Found";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AddEmployee from "./pages/AddEmployee";
import Billing from "./pages/Billing";
import CategoryManagement from "./pages/CategoryManagement";
import ProductManagement from "./pages/ProductManagement";
import Reports from "./pages/Reports";

const App = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/billing"
          element={
            userRole === "employee" ? (
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/add-employee"
          element={
            userRole !== "employee" ? (
              <ProtectedRoute>
                <AddEmployee />
              </ProtectedRoute>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/category-management"
          element={
            <ProtectedRoute>
              <CategoryManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product-management"
          element={
            <ProtectedRoute>
              <ProductManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
