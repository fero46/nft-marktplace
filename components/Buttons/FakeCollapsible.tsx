import { IconDefinition } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Translate from "../Text/Translate";
import PlusButton from "./PlusButton";

interface FakeCollapsibleProps {
  title: string;
  description: string;
  isButton: boolean;
  icon: IconDefinition;
  callback: Function;
  translate?: boolean;
}

const FakeCollapsible: React.FC<FakeCollapsibleProps> = ({
  title,
  description,
  isButton,
  icon,
  callback,
  translate,
}) => {
  return (
    <div className="is-flex is-flex-direction-row is-justify-content-space-between is-fullwidth collapsible-header py-5 px-3">
      <div className="is-flex">
        <FontAwesomeIcon icon={icon} className="mr-3 mt-1" />
        <div className="content">
          <p className="is-capitalized">
            <b>{translate ? <Translate keyword={title} /> : title}</b>
            <br />
            {description && <Translate keyword={description} />}
          </p>
        </div>
      </div>
      {isButton && <PlusButton callback={callback} />}
    </div>
  );
};

export default FakeCollapsible;
