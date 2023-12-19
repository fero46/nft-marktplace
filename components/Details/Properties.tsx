import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  OwnerCreatorProps,
  NFTDetailsProps,
  NFTPropertyProps,
} from "../../utils/types";
import Collapsible from "../Buttons/Collapsible";
import NFTProperty from "./NFTProperty";

interface PropertiesProps {
  properties: NFTPropertyProps[];
}

const Properties: React.FC<PropertiesProps> = ({ properties }) => {
  return (
    <Collapsible title="properties" icon={faAlignLeft} translate>
      <div className="columns is-multiline">
        {properties.map((p, key) => (
          <NFTProperty {...p} key={key} />
        ))}
      </div>
    </Collapsible>
  );
};

export default Properties;
