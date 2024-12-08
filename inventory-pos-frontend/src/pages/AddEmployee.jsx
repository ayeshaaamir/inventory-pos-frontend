import { useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import MenuBarComponent from "../components/MenuBarComponent";
import useForm from "../hooks/useForm";
import { validateForm, isFormDisabled } from "../utils/validationUtils";
import { addEmployee } from "../services/employeeService";

const AddEmployee = () => {
  const userRole = localStorage.getItem("userRole");
  const { form, errors, setErrors, handleChange, setForm } = useForm({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
  });
  const toast = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await addEmployee(form, token);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Employee added successfully!",
        life: 3000,
      });
      setForm({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        email: "",
      });
    } catch (error) {
      if (error.errors) {
        setErrors(error.errors);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: error.message,
          life: 3000,
        });
      }
    }
  };

  return (
    <>
      <MenuBarComponent userRole={userRole} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "100vh",
          backgroundColor: "#f8f9fa",
          padding: "1rem",
          paddingTop: "1rem",
        }}
      >
        <Card
          title="Add Employee"
          subTitle="Fill in the details to add a new employee"
          style={{
            maxWidth: "500px",
            width: "100%",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <Toast ref={toast} />
          <form onSubmit={handleSubmit} className="p-fluid">
            <div className="p-field">
              <label htmlFor="first_name" className="p-text-bold">
                First Name <span className="p-error">*</span>
              </label>
              <InputText
                id="first_name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className={errors.first_name ? "p-invalid" : ""}
                placeholder="Enter first name"
              />
              {errors.first_name && (
                <small className="p-error">{errors.first_name}</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="last_name" className="p-text-bold">
                Last Name <span className="p-error">*</span>
              </label>
              <InputText
                id="last_name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className={errors.last_name ? "p-invalid" : ""}
                placeholder="Enter last name"
              />
              {errors.last_name && (
                <small className="p-error">{errors.last_name}</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="username" className="p-text-bold">
                Username <span className="p-error">*</span>
              </label>
              <InputText
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                className={errors.username ? "p-invalid" : ""}
                placeholder="Enter username"
              />
              {errors.username && (
                <small className="p-error">{errors.username}</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="password" className="p-text-bold">
                Password <span className="p-error">*</span>
              </label>
              <Password
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                feedback={false}
                toggleMask
                className={errors.password ? "p-invalid" : ""}
                placeholder="Enter password"
              />
              {errors.password && (
                <small className="p-error">{errors.password}</small>
              )}
            </div>

            <div className="p-field">
              <label htmlFor="email" className="p-text-bold">
                Email <span className="p-error">*</span>
              </label>
              <InputText
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={errors.email ? "p-invalid" : ""}
                placeholder="Enter email"
              />
              {errors.email && (
                <small className="p-error">{errors.email}</small>
              )}
            </div>

            <Divider />

            <div className="p-d-flex p-jc-end">
              <Button
                type="submit"
                label="Add Employee"
                className="p-mt-3"
                disabled={isFormDisabled(form)}
                icon="pi pi-plus"
              />
            </div>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddEmployee;
