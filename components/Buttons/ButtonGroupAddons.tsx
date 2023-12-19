import Addon, { AddonProps } from "./Addon";

interface ButtonGroupAddonsProps {
  list?: AddonProps[];
}

const ButtonGroupAddons: React.FC<ButtonGroupAddonsProps> = ({
  list = [],
  children,
}) => {
  return (
    <div className="field has-addons">
      {list.map((props, i) => (
        <>
          <Addon {...props} />
        </>
      ))}
      {children}
    </div>
  );
};

export default ButtonGroupAddons;
