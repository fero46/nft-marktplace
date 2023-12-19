import { CollectionProps } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import Tooltip from "../Tooltip";
interface CollectionByProps {
  collection: CollectionProps; //the owner
}

const CollectionBy: React.FC<CollectionByProps> = ({ collection }) => {
  return (
    <div className="is-flex">
      <a href="" className="subtitle has-text-link my-auto">
        {collection.name}
      </a>

      {collection.isVerified && (
        <>
          <FontAwesomeIcon
            data-tip="Verified"
            icon={faCheckCircle}
            className="ml-1 my-auto"
            color="#485fc7"
          />
          <Tooltip />
        </>
      )}
    </div>
  );
};

export default CollectionBy;
