import clsx from "clsx";

interface ButtonWrapperProps {
  onClick: Function;
  selected?: boolean;
  className?: string;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  onClick,
  selected,
  className,
  children,
}) => {
  return (
    <div
      className={clsx(
        className,
        selected ? "active" : "passive",
        "is-clickable button-wrapper"
      )}
      onClick={() => onClick()}
    >
      {children}
    </div>
  );
};

export default ButtonWrapper;
