import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

interface ProfileButtonProps {
  account: string | null | undefined;
  routerAsPath: string;
  connectWalletFirst: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  account,
  routerAsPath,
  connectWalletFirst,
}) => {
  const [active, setActive] = useState<boolean>(false);

  return account ? (
    <div
      className={clsx(
        "navbar-item has-dropdown",
        active && "is-active",
        routerAsPath.includes("/user/you") && "new-active"
      )}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(false)}
    >
      <Link href="/user/you" passHref>
        <a className="navbar-link is-arrowless">
          <FontAwesomeIcon icon={faUserCircle} size={"lg"} />
        </a>
      </Link>
      <div className="navbar-dropdown is-right is-black">
        <Link href="/user/you">
          <a className="navbar-item py-3">Profile</a>
        </Link>
        <Link href="/user/you">
          <a className="navbar-item py-3">Collections</a>
        </Link>
        <Link href="/settings">
          <a className="navbar-item py-3">Settings</a>
        </Link>
      </div>
    </div>
  ) : (
    <button
      className="navbar-item button is-black is-radiusless my-auto py-5"
      onClick={connectWalletFirst}
    >
      <FontAwesomeIcon icon={faUserCircle} size={"lg"} />
    </button>
  );
};

export default ProfileButton;
