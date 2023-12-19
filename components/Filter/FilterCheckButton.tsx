import React, { useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import Translate from "../Text/Translate";

interface CollectionButtonProps {
  title: string;
  imageSrc?: string;
  icon?: IconDefinition;
  selected?: boolean;
  data: any;
  swapper: (el: any, selected: boolean) => void;
  translate?: boolean;
}

const CollectionButton: React.FC<CollectionButtonProps> = ({
  title,
  imageSrc,
  icon,
  selected = false,
  data,
  swapper,
  translate = false,
}) => {
  return (
    <button
      className="button new-ghost is-flex is-fullwidth is-justify-content-flex-start p-0"
      onClick={(e) => swapper(data, selected)}
    >
      <figure className="image is-24x24">
        {selected ? (
          <FontAwesomeIcon icon={faCheckCircle} color="blue" />
        ) : imageSrc ? (
          <Image
            src={imageSrc}
            alt="Collection Image"
            width={24}
            height={24}
            className="is-rounded"
          />
        ) : (
          icon && <FontAwesomeIcon icon={icon} color="blue" />
        )}
      </figure>
      <p className="ml-3">
        {translate ? <Translate keyword={title} /> : title}
      </p>
    </button>
  );
};

export default CollectionButton;
