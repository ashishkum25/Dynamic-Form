import { useState } from "react";

const Login = ({ onLoginSuccess, isLoading }) => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
  });
  const [errors, setErrors] = useState({
    rollNumber: "",
    name: "",
  });

  const validateForm = () => {
    let isValid = true;
    let newErrors = { rollNumber: "", name: "" };

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll Number is required";
      isValid = false;
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onLoginSuccess(formData);
    }
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number</label>
          <input
            type="text"
            id="rollNumber"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            data-testid="roll-number-input"
          />
          {errors.rollNumber && <span className="error">{errors.rollNumber}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name-input"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          data-testid="login-button"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;