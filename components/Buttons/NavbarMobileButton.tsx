import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface NavbarMobileButtonProps {
  icon?: IconDefinition;
  title: string;
  hasSubmenu?: boolean;
  href?: string;
  back?: boolean;
  setter?: (e: any) => void;
}

const NavbarMobileButton: React.FC<NavbarMobileButtonProps> = ({
  icon,
  title,
  hasSubmenu = false,
  href = "#",
  back,
  setter,
}) => {
  const buttonClass = back
    ? "button is-fullwidth is-large is-radiusless is-justify-content-space-between"
    : "button is-fullwidth is-large new-ghost is-justify-content-space-between";
  return hasSubmenu ? (
    <button className={buttonClass} onClick={setter}>
      <div className="is-flex">
        {icon && (
          <FontAwesomeIcon icon={icon} height={30} className="mr-3 my-auto" />
        )}
        {title}
      </div>
      <div className="is-flex">
        {!back && (
          <FontAwesomeIcon
            icon={faAngleRight}
            height={30}
            className="my-auto"
          />
        )}
      </div>
    </button>
  ) : (
    <Link href={href} passHref>
      <a className="button is-fullwidth is-large new-ghost is-justify-content-space-between">
        <div className="is-flex">
          {icon && (
            <FontAwesomeIcon icon={icon} height={30} className="mr-3 my-auto" />
          )}
          {title}
        </div>
      </a>
    </Link>
  );
};

export default NavbarMobileButton;
