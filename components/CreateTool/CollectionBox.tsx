import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Image from "next/image";

interface CollectionBoxProps {
  name: string;
  short: string;
  image?: string;
  selected?: boolean;
  onClick: () => void;
}

const CollectionBox: React.FC<CollectionBoxProps> = ({
  name,
  short,
  image,
  selected = false,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        "button collection-box is-flex is-flex-direction-column is-fullwidth px-0",
        selected ? "active" : "passive"
      )}
      onClick={onClick}
    >
      <figure className="image is-48x48 my-auto">
        {image ? (
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="is-rounded"
          />
        ) : (
          <FontAwesomeIcon icon={faPlusCircle} size={"3x"} />
        )}
      </figure>
      <b className="is-size-5">{name}</b>
      <small className="has-text-grey">{short}</small>
    </button>
  );
};

export default CollectionBox;
