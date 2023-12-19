import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Translate from "../Text/Translate";

export interface BubbleProps {
  title: string;
  imageSrc?: string;
  icon?: IconDefinition;
  tag: string;
  data?: any;
  translate?: boolean;
  filterSetter: () => void;
}

const Bubble: React.FC<BubbleProps> = ({
  title,
  imageSrc,
  icon,
  tag,
  translate,
  filterSetter,
}) => {
  const handleClick = () => {
    filterSetter;
  };

  return (
    <button className="button is-info is-light py-5" onClick={filterSetter}>
      {icon && (
        <i>
          <FontAwesomeIcon icon={icon} className="my-auto mr-3" />
        </i>
      )}
      {imageSrc && (
        <figure className="image is-24x24 mr-3">
          <Image
            src={imageSrc}
            alt="Collection Image"
            width={24}
            height={24}
            className="is-rounded"
          />
        </figure>
      )}
      {translate ? <Translate keyword={title} /> : title}
      <i>
        <FontAwesomeIcon icon={faTimes} className="my-auto ml-5" />
      </i>
    </button>
  );
};

export default Bubble;
