import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { NFTDetailsProps } from "../../utils/types";
import Collapsible from "../Buttons/Collapsible";
import NFTDetails from "./NFTDetails";

interface DetailsProps {
  details: NFTDetailsProps;
}

const Details: React.FC<DetailsProps> = ({ details }) => {
  return (
    <Collapsible title="details" icon={faAlignLeft} translate>
      <NFTDetails {...details} />
    </Collapsible>
  );
};

export default Details;
