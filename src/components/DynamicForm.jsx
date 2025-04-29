import { useState } from "react";
import FormSectionComponent from "./FormSectionComponent";

const DynamicForm = ({ formData }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [collectedData, setCollectedData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { form } = formData;
  const sections = form.sections;
  const currentSection = sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === sections.length - 1;

  const handleFieldChange = (fieldId, value) => {
    setCollectedData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const validateSection = (section) => {
    let isValid = true;
    
    for (const field of section.fields) {
      // Check if required field has a value
      if (field.required && !collectedData[field.fieldId]) {
        isValid = false;
        break;
      }
      
      // Check for minLength validation
      if (
        field.minLength && 
        typeof collectedData[field.fieldId] === 'string' && 
        collectedData[field.fieldId].length < field.minLength
      ) {
        isValid = false;
        break;
      }
      
      if (
        field.maxLength && 
        typeof collectedData[field.fieldId] === 'string' && 
        collectedData[field.fieldId].length > field.maxLength
      ) {
        isValid = false;
        break;
      }
    }
    
    return isValid;
  };

  const handleNext = () => {
    if (validateSection(currentSection)) {
      setCurrentSectionIndex((prev) => prev + 1);
    } else {
      alert("Please fix validation errors before proceeding.");
    }
  };

  const handlePrev = () => {
    setCurrentSectionIndex((prev) => Math.max(0, prev - 1));
  };

  const handleSubmit = () => {
    if (validateSection(currentSection)) {
      console.log("Form Submission Data:", collectedData);
      setIsSubmitted(true);
    } else {
      alert("Please fix validation errors before submitting.");
    }
  };

  return (
    <div className="dynamic-form">
      <h1>{form.formTitle}</h1>
      
      {isSubmitted ? (
        <div className="submission-successful">
          <h2>Form Submitted Successfully!</h2>
          <p>Check the console for the submitted data.</p>
        </div>
      ) : (
        <>
          <div className="section-navigation">
            <span>
              Section {currentSectionIndex + 1} of {sections.length}
            </span>
          </div>
          
          <FormSectionComponent
            section={currentSection}
            formValues={collectedData}
            onChange={handleFieldChange}
          />
          
          <div className="form-navigation">
            {currentSectionIndex > 0 && (
              <button 
                onClick={handlePrev}
                data-testid="prev-button"
              >
                Previous
              </button>
            )}
            
            {!isLastSection ? (
              <button 
                onClick={handleNext}
                data-testid="next-button"
              >
                Next
              </button>
            ) : (
              <button 
                onClick={handleSubmit}
                data-testid="submit-button"
              >
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default DynamicForm;
