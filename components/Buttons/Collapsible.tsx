import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import Translate from "../Text/Translate";

interface CollapsibleProps {
  title: string;
  icon?: IconDefinition;
  isCollapsible?: boolean;
  isGray?: boolean;
  initiallyOpen?: boolean;
  translate?: boolean;
}

const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  icon,
  isCollapsible = true,
  isGray,
  initiallyOpen = false,
  children,
  translate,
}) => {
  const [show, setShow] = useState<boolean>(initiallyOpen);

  const buttonClass =
    "collapsible-header button is-white is-fullwidth is-flex is-justify-content-space-between py-55 is-radiusless";

  const handleClick = () => {
    let newShow = !show;
    setShow(newShow);
  };

  return isCollapsible ? (
    <>
      <button
        className={clsx(buttonClass, isGray && isGray)}
        onClick={(e) => handleClick()}
      >
        <div className="is-flex">
          {icon && <FontAwesomeIcon icon={icon} className="mr-3 my-auto" />}
          <p className="is-title is-size-5">
            {translate ? <Translate keyword={title} /> : title}
          </p>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faAngleUp}
            className={clsx("flip", !show && "active")}
          />
        </div>
      </button>
      <div
        className={clsx(
          "card-content collapsible-body",
          show ? "active" : "passive"
        )}
      >
        <div className="p-5">{children}</div>
      </div>
    </>
  ) : (
    <>
      <div className={clsx(buttonClass, isGray && isGray)}>
        <div className="is-flex">
          {icon && <FontAwesomeIcon icon={icon} className="mr-3 my-auto" />}
          <p className="is-title is-size-5">
            {translate ? <Translate keyword={title} /> : title}
          </p>
        </div>
      </div>
      <div className="card-content p-0 not-collapsible">
        <div className="p-5">{children}</div>
      </div>
    </>
  );
};

export default Collapsible;
