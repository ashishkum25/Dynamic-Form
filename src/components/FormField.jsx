import { useState } from "react";

const FormField = ({ field, value, onChange }) => {
  const [error, setError] = useState(null);

  const validateField = (value) => {
    // Check if required field is empty
    if (field.required && !value) {
      setError("This field is required");
      return false;
    }
    
    // Check minLength validation for text inputs
    if (
      field.minLength &&
      typeof value === "string" &&
      value.length < field.minLength
    ) {
      setError(`Minimum length is ${field.minLength} characters`);
      return false;
    }
    
    // Check maxLength validation for text inputs
    if (
      field.maxLength &&
      typeof value === "string" &&
      value.length > field.maxLength
    ) {
      setError(`Maximum length is ${field.maxLength} characters`);
      return false;
    }
    
    // Email validation
    if (field.type === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError("Please enter a valid email address");
        return false;
      }
    }
    
    // Phone validation
    if (field.type === "tel" && value) {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        setError("Please enter a valid 10-digit phone number");
        return false;
      }
    }
    
    // If we reach here, all validations passed
    setError(null);
    return true;
  };

  const handleChange = (e) => {
    const newValue = e.target.type === "checkbox" 
      ? e.target.checked 
      : e.target.value;
    
    onChange(newValue);
    validateField(newValue);
  };

  // Render different field types
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "tel":
      case "date":
        return (
          <input
            type={field.type}
            id={field.fieldId}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            data-testid={field.dataTestId}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
          />
        );
      
      case "textarea":
        return (
          <textarea
            id={field.fieldId}
            value={value}
            onChange={handleChange}
            placeholder={field.placeholder}
            data-testid={field.dataTestId}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
          />
        );
      
      case "dropdown":
        return (
          <select
            id={field.fieldId}
            value={value}
            onChange={handleChange}
            data-testid={field.dataTestId}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case "radio":
        return (
          <div className="radio-group">
            {field.options?.map((option) => (
              <div key={option.value} className="radio-option">
                <input
                  type="radio"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={() => {
                    onChange(option.value);
                    validateField(option.value);
                  }}
                  data-testid={option.dataTestId}
                  required={field.required}
                />
                <label htmlFor={`${field.fieldId}-${option.value}`}>
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      
      case "checkbox":
        if (field.options) {
          // Multiple checkboxes
          return (
            <div className="checkbox-group">
              {field.options.map((option) => (
                <div key={option.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    id={`${field.fieldId}-${option.value}`}
                    value={option.value}
                    checked={Array.isArray(value) && value.includes(option.value)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      let newValue = Array.isArray(value) ? [...value] : [];
                      
                      if (isChecked) {
                        newValue.push(option.value);
                      } else {
                        newValue = newValue.filter(v => v !== option.value);
                      }
                      
                      onChange(newValue);
                      validateField(newValue);
                    }}
                    data-testid={option.dataTestId}
                  />
                  <label htmlFor={`${field.fieldId}-${option.value}`}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          );
        } else {
          // Single checkbox
          return (
            <div className="checkbox-single">
              <input
                type="checkbox"
                id={field.fieldId}
                checked={!!value}
                onChange={(e) => {
                  onChange(e.target.checked);
                  validateField(e.target.checked);
                }}
                data-testid={field.dataTestId}
                required={field.required}
              />
              <label htmlFor={field.fieldId}>{field.label}</label>
            </div>
          );
        }
      
      default:
        return <p>Unsupported field type: {field.type}</p>;
    }
  };

  return (
    <div className="form-field">
      {field.type !== "checkbox" && (
        <label htmlFor={field.fieldId}>
          {field.label} {field.required && <span className="required">*</span>}
        </label>
      )}
      
      {renderField()}
      
      {error && <span className="field-error">{error}</span>}
      {field.validation?.message && !value && field.required && (
        <span className="field-error">{field.validation.message}</span>
      )}
    </div>
  );
};

export default FormField;