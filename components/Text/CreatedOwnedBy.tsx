import { OwnerCreatorProps } from "../../utils/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import ReactTooltip from "react-tooltip";
import Tooltip from "../Tooltip";
import Link from "next/link";
import clsx from "clsx";
import { useTranslate } from "./Translate";

interface CreatedOwnedByProps {
  isCreated: boolean; //true if created, false if owned by the user
  creatorOwner: OwnerCreatorProps; //the owner
  only?: boolean; //doesn't show "created/owned by" text
  centered?: boolean; //because this has to be flex because icons
}

const CreatedOwnedBy: React.FC<CreatedOwnedByProps> = ({
  isCreated,
  creatorOwner,
  only = false,
  centered = false,
}) => {
  const created = useTranslate("created_by");
  const owned = useTranslate("owned_by");
  const verified = useTranslate("verified");
  const text = isCreated ? created : owned;
  return (
    <div className={clsx("is-flex", centered && "is-justify-content-center")}>
      <p className="my-auto">
        {!only && <span className="has-text-grey">{text} </span>}
        <Link href={"/user/" + creatorOwner.name}>
          <a>{creatorOwner.name}</a>
        </Link>
      </p>
      {creatorOwner.isVerified && (
        <>
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="my-auto ml-1"
            color="#485fc7"
            data-tip={verified}
          />
          <Tooltip />
        </>
      )}
    </div>
  );
};

export default CreatedOwnedBy;
