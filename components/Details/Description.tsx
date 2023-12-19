import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { OwnerCreatorProps } from "../../utils/types";
import Collapsible from "../Buttons/Collapsible";
import CreatedOwnedBy from "../Text/CreatedOwnedBy";

interface DescriptionProps {
  description: string;
  createdBy: OwnerCreatorProps;
}

const Description: React.FC<DescriptionProps> = ({
  description,
  createdBy,
}) => {
  return (
    <Collapsible
      title="description"
      icon={faAlignLeft}
      isCollapsible={false}
      translate
    >
      <CreatedOwnedBy isCreated={true} creatorOwner={createdBy} />
      <div className="mt-3">{description}</div>
    </Collapsible>
  );
};

export default Description;
