import MenuBarComponent from "../components/MenuBarComponent";

const AddEmployee = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <MenuBarComponent userRole={userRole} />
    </>
  );
};

export default AddEmployee;
