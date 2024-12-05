import MenuBarComponent from "../components/MenuBarComponent";

const Billing = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <MenuBarComponent userRole={userRole} />
    </>
  );
};

export default Billing;
