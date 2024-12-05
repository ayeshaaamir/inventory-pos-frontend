import { useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import PropTypes from "prop-types";
import { eraseCookie } from "../utils/cookieUtils";

const MenuBarComponent = ({ userRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    eraseCookie("token");
    eraseCookie("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userRole");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/dashboard"),
    },
    {
      label: "Product Management",
      icon: "pi pi-cog",
      command: () => navigate("/product-management"),
      visible: userRole !== "employee",
    },
    {
      label: "Category Management",
      icon: "pi pi-th-large",
      command: () => navigate("/category-management"),
      visible: userRole !== "employee",
    },
    {
      label: "Add Employee",
      icon: "pi pi-user-plus",
      command: () => navigate("/add-employee"),
      visible: userRole !== "employee",
    },
    {
      label: "Reports",
      icon: "pi pi-chart-bar",
      command: () => navigate("/reports"),
      visible: userRole !== "employee",
    },
    {
      label: "Billing",
      icon: "pi pi-wallet",
      command: () => navigate("/billing"),
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => item.visible !== false);

  return (
    <Menubar
      model={filteredMenuItems}
      end={
        <Button label="Logout" icon="pi pi-power-off" onClick={handleLogout} />
      }
    />
  );
};

MenuBarComponent.propTypes = {
  userRole: PropTypes.string.isRequired,
};

export default MenuBarComponent;
