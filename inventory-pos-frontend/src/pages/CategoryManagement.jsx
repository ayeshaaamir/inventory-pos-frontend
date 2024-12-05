import MenuBarComponent from "../components/MenuBarComponent";

const CategoryManagement = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <MenuBarComponent userRole={userRole} />
    </>
  );
};

export default CategoryManagement;
