import {
  BrowserRouter as Router,
  Routes,
  Route,
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
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
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
            userRole !== "employee" ? (
              <ProtectedRoute>
                <CategoryManagement />
              </ProtectedRoute>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/product-management"
          element={
            userRole !== "employee" ? (
              <ProtectedRoute>
                <ProductManagement />
              </ProtectedRoute>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route
          path="/reports"
          element={
            userRole !== "employee" ? (
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
