import { OwnerCreatorProps } from "../../utils/types";
import Image from "next/image";
import CreatedOwnedBy from "../Text/CreatedOwnedBy";

interface CollectionCardProps {
  bannerHref?: string;
  imageHref?: string;
  name: string;
  verified?: boolean;
  description?: string;
  creator: OwnerCreatorProps;
}

const CollectionCard: React.FC<CollectionCardProps> = ({
  bannerHref,
  imageHref,
  name,
  verified,
  description,
  creator,
}) => {
  return (
    <div className="box is-flex is-flex-direction-column collection-card is-align-items-center content p-0">
      <div className="wrapper">
        <Image src={bannerHref} alt={name} layout="fill" objectFit="cover" />
        <figure className="inner image is-1x1">
          <Image
            src={imageHref}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="is-rounded"
          />
        </figure>
      </div>
      <b className="is-title">{name}</b>
      <CreatedOwnedBy isCreated creatorOwner={creator} />
      <br />
      <p className="has-text-grey px-3 has-text-centered">{description}</p>
    </div>
  );
};

export default CollectionCard;
