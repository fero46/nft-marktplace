import Translate from "../Text/Translate";

const RequiredFields: React.FC = () => {
  return (
    <div className="mb-0">
      <small className="has-text-grey">
        <span className="has-text-danger">* </span>
        <Translate keyword="required_fields" />
      </small>
    </div>
  );
};

export default RequiredFields;
