import MenuBarComponent from "../components/MenuBarComponent";

const ProductManagement = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <MenuBarComponent userRole={userRole} />
    </>
  );
};

export default ProductManagement;
