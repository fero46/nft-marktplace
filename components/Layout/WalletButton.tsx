import { faWallet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import AddressDisplay from "../Text/AddressDisplay";
import Tooltip from "../Tooltip";

interface WalletButtonProps {
  account: string | undefined | null;
  setWalletConnect: Dispatch<SetStateAction<boolean>>;
  setWalletShow: Dispatch<SetStateAction<boolean>>;
  open: boolean;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  account,
  setWalletConnect,
  setWalletShow,
  open,
}) => {
  const blue = "#3E8ED0";

  return (
    <button
      className="navbar-item button is-black is-radiusless my-auto py-5"
      onClick={() =>
        account
          ? setWalletShow((prev) => !prev)
          : setWalletConnect((prev) => !prev)
      }
    >
      <FontAwesomeIcon
        icon={faWallet}
        size={"lg"}
        color={open ? blue : undefined}
      />
    </button>
  );
};

export default WalletButton;
