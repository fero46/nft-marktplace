import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tooltip from "../Tooltip";
export interface AddonProps {
  icon: IconDefinition;
  tooltipText?: string;
  moreOptions?: AddonProps;
  link?: {
    linkHref: string;
    isExternal?: boolean;
  };
  button?: {
    action: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
  };
}

const Addon: React.FC<AddonProps> = ({
  icon,
  tooltipText,
  moreOptions,
  link,
  button,
}) => {
  return (
    <>
      <Tooltip />
      <p className="control" data-tip={tooltipText ? tooltipText : ""}>
        {link && (
          <a href={link.linkHref} className="button">
            <FontAwesomeIcon icon={icon} />
          </a>
        )}
        {button && (
          <button
            onClick={button.action}
            className="button"
            disabled={button.disabled}
          >
            <FontAwesomeIcon icon={icon} />
          </button>
        )}
      </p>
    </>
  );
};

export default Addon;
