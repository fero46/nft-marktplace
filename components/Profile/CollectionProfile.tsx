import { OwnerCreatorProps } from "../../utils/types";
import CopyDataButton from "../Buttons/CopyDataButton";
import AddressDisplay from "../Text/AddressDisplay";
import CreatedOwnedBy from "../Text/CreatedOwnedBy";
import ProfilePicture from "./ProfilePicture";

interface CollectionProfileProps {
  collection: string;
  creator: OwnerCreatorProps;
  username?: string;
  description?: string;
  joined?: string;
}

const CollectionProfile: React.FC<CollectionProfileProps> = ({
  collection,
  username = "Unnamed",
  description,
  joined,
}) => {
  return (
    <section className="pb-6 pfp">
      <div className="content is-flex is-flex-direction-column is-justify-content-center">
        <div className="wrapper">
          <ProfilePicture href="https://via.placeholder.com/360x360" />
        </div>
        <div className="has-text-centered">
          <h1 className="is-size-1 is-fullwidth mb-1">Username</h1>
          <p>
            <CreatedOwnedBy
              creatorOwner={{
                name: "Osman",
                wallet: "124214124123",
                isVerified: true,
              }}
              isCreated
              centered
            />
          </p>
          {description && <p>{description}</p>}
        </div>
      </div>
    </section>
  );
};

export default CollectionProfile;
