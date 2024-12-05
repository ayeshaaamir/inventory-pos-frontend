import MenuBarComponent from "../components/MenuBarComponent";

const Reports = () => {
  const userRole = localStorage.getItem("userRole");

  return (
    <>
      <MenuBarComponent userRole={userRole} />
    </>
  );
};

export default Reports;
