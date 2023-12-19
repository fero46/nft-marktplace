import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { ReferenceProps } from "../../utils/types";
import Addon from "../Buttons/Addon";
import Collapsible from "../Buttons/Collapsible";
import getIcon from "../../utils/getIcon";
import { useTranslate } from "../Text/Translate";

interface AboutProps {
  nftName: string;
  about: string;
  references?: ReferenceProps[];
}

const About: React.FC<AboutProps> = ({ nftName, about, references }) => {
  const t = useTranslate("about");
  const aboutTitle = t + " " + nftName;

  return (
    <Collapsible title={aboutTitle} icon={faInfoCircle}>
      {about}

      {references && (
        <div className="field has-addons mt-5">
          {references.map((r, key) => (
            <Addon
              key={key}
              icon={getIcon(r.platform)}
              tooltipText={r.platform}
              link={{
                linkHref: r.href,
                isExternal: true,
              }}
            />
          ))}
        </div>
      )}
    </Collapsible>
  );
};

export default About;
