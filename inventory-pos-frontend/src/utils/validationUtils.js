export const validateForm = (form) => {
  const errors = {};
  if (!form.email.match(/^\S+@\S+\.\S+$/)) {
    errors.email = "Please enter a valid email address.";
  }
  if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters long.";
  }
  return errors;
};

export const isFormDisabled = (form) => {
  return Object.values(form).some((value) => value.trim() === "");
};
