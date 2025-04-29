import FormField from "./FormField";

const FormSectionComponent = ({ section, formValues, onChange }) => {
  return (
    <div className="form-section" data-testid={`section-${section.sectionId}`}>
      <h2>{section.title}</h2>
      <p>{section.description}</p>
      
      {section.fields.map((field) => (
        <FormField
          key={field.fieldId}
          field={field}
          value={formValues[field.fieldId] || ""}
          onChange={(value) => onChange(field.fieldId, value)}
        />
      ))}
    </div>
  );
};

export default FormSectionComponent;