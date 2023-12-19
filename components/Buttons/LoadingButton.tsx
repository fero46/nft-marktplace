import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

interface LoadingButtonProps {
  loading: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  color?: string;
  size?: string;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  className,
  onClick,
  disabled,
  color = "white",
  size = "1em",
  children,
}) => {
  return (
    <button
      className={className}
      onClick={onClick}
      type="button"
      disabled={loading || disabled}
    >
      {loading ? <TailSpin color={color} height={size} /> : children}
    </button>
  );
};

export default LoadingButton;
