import { NFTPropertyProps } from "../../utils/types";
import { useTranslate } from "../Text/Translate";

const NFTProperty: React.FC<NFTPropertyProps> = ({ tag, value, rarity }) => {
  const t = useTranslate("have_this_trait");
  return (
    <div className="column is-one-third">
      <div className="box property-box">
        <p className="ptag">{tag}</p>
        <p className="value">{value}</p>
        <p className="rarity">
          %{rarity} {t}
        </p>
      </div>
    </div>
  );
};

export default NFTProperty;
