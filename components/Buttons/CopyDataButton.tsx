import { toast } from "react-toastify";
import { useTranslate } from "../Text/Translate";
import Tooltip from "../Tooltip";

interface CopyDataButtonProps {
  data: string;
  buttonClass: string;
}

const CopyDataButton: React.FC<CopyDataButtonProps> = ({
  data,
  buttonClass,
  children,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(data);
    toast.success("Text copied");
  };

  const copy = useTranslate("copy");

  return (
    <>
      <button className={buttonClass} onClick={handleCopy} data-tip={copy}>
        {children}
      </button>
      <Tooltip />
    </>
  );
};

export default CopyDataButton;
