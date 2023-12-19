import {
  faRedoAlt,
  faExternalLinkAlt,
  faShareAlt,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import Addon from "../Buttons/Addon";

interface AssetsAddonsProps {
  //burası dolar
}

const AssetsAddons: React.FC<AssetsAddonsProps> = () => {
  return (
    <div className="field has-addons mb-0">
      <Addon
        icon={faGift}
        tooltipText="Gift"
        link={{
          linkHref: "#",
          isExternal: true,
        }}
      />
      <Addon
        icon={faRedoAlt}
        tooltipText="Refresh NFT"
        link={{
          linkHref: "#",
          isExternal: true,
        }}
      />
      <Addon
        icon={faExternalLinkAlt}
        tooltipText="Visit Site"
        link={{
          linkHref: "#",
          isExternal: true,
        }}
      />
      <Addon
        icon={faShareAlt}
        tooltipText="Share"
        link={{
          linkHref: "#",
          isExternal: true,
        }}
      />
    </div>
  );
};

export default AssetsAddons;
