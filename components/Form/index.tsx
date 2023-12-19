import Translate from "../Text/Translate";

interface FormProps {
  label: string;
  required?: boolean;
  description?: string;
  name?: string;
  info?: string;
}

const Form: React.FC<FormProps> = ({
  label,
  required,
  description,
  name,
  children,
}) => {
  return (
    <div className="field mb-5">
      <label className="label is-size-5" htmlFor={name}>
        <Translate keyword={label} />{" "}
        {required && <span className="has-text-danger">*</span>}
      </label>
      {description && (
        <small className="has-text-grey">
          <Translate keyword={description} />
        </small>
      )}
      {children}
    </div>
  );
};

export default Form;
