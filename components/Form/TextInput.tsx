import clsx from "clsx";
import { Dispatch, SetStateAction } from "react";
import Translate from "../Text/Translate";

interface TextInputProps {
  getter?: string;
  setter: Dispatch<SetStateAction<string | undefined>>;
  placeholder?: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  getter,
  setter,
  placeholder,
  required,
  children,
}) => {
  return (
    <>
      <input
        className={clsx(
          "input",
          required && getter != undefined && getter.length === 0 && "is-danger"
        )}
        type="text"
        placeholder={placeholder}
        onChange={(e) => setter(e.currentTarget.value)}
        value={getter}
      />
      {required && getter != undefined && getter.length === 0 && (
        <small className="has-text-danger">
          <Translate keyword="required_error" />
        </small>
      )}
      {children}
    </>
  );
};

export default TextInput;
