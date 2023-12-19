import { OwnerCreatorProps, NFTDetailsProps } from "../../utils/types";
import Addon from "../Buttons/Addon";
import Translate from "../Text/Translate";

const NFTDetails: React.FC<NFTDetailsProps> = ({
  address,
  tokenID,
  tokenStandard,
  blockChain,
}) => {
  const addressDisplay = address.slice(0, 6) + "..." + address.slice(-5, -1);
  const addressLink = "https://etherscan.io/address/" + address;

  return (
    <>
      <div className="is-flex is-justify-content-space-between mb-2">
        <p>
          <Translate keyword="contact_address" />
        </p>
        <p>
          <a href={addressLink}>{addressDisplay}</a>
        </p>
      </div>
      <div className="is-flex is-justify-content-space-between mb-2">
        <p>
          <Translate keyword="token_id" />
        </p>
        <p>{tokenID}</p>
      </div>
      <div className="is-flex is-justify-content-space-between mb-2">
        <p>
          <Translate keyword="token_standard" />
        </p>
        <p>{tokenStandard}</p>
      </div>
      <div className="is-flex is-justify-content-space-between mb-2">
        <p>
          <Translate keyword="blockchain" />
        </p>
        <p>{blockChain}</p>
      </div>
    </>
  );
};

export default NFTDetails;
