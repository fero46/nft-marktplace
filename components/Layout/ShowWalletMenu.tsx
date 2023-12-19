import GhostDropdown, { GhostDropdownProps } from "../Buttons/GhostDropdown";
import metaMaskLogo from "../../public/logos/metamask-logo.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faSignOutAlt,
  faSyncAlt,
} from "@fortawesome/free-solid-svg-icons";
import CopyDataButton from "../Buttons/CopyDataButton";
import AddressDisplay from "../Text/AddressDisplay";
import Translate from "../Text/Translate";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useActiveWeb3React, useWalletAuth } from "../../hooks/web3";
import Skeleton from "react-loading-skeleton";

interface ShowWalletMenuProps {
  account: string | undefined | null;
  injector: string;
  big: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const ShowWalletMenu: React.FC<ShowWalletMenuProps> = ({
  account,
  injector,
  big,
  setShow,
}) => {
  const [balance, setBalance] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const buttonClass =
    "dropdown-item new-ghost button is-flex is-justify-content-space-between is-fullwidth py-5";

  const { logout, getBalance } = useWalletAuth();

  const refreshFunds = async () => {
    setLoading(true);
    await getBalance()
      .then((value) => {
        if (value) setBalance(value);
        else setBalance("none"); //raise error
      })
      .catch(() => setBalance("none")); //raise error
    setLoading(false);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refreshFunds();
  }, [getBalance, setBalance]);

  return (
    <div className="is-flex is-justify-content-space-between is-flex-direction-column">
      <div>
        <div className="p-3">
          <div className="is-flex is-justify-content-space-between is-fullwidth collapsible-header py-5">
            <div>
              <GhostDropdown
                title="my_wallet"
                translate={true}
                ref={dropdownRef}
              >
                <div className={buttonClass}>
                  <div className="is-flex">
                    <div
                      style={{
                        width: "1.5rem",
                      }}
                    >
                      <Image
                        src={metaMaskLogo}
                        layout="responsive"
                        objectFit="contain"
                        alt="MetaMask Logo"
                        className="my-auto"
                      />
                    </div>
                    <p className="my-auto ml-3">{injector}</p>
                  </div>
                  <FontAwesomeIcon icon={faCheck} color="green" />
                </div>
                <button className={buttonClass} onClick={() => logout()}>
                  <div className="is-flex">
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      className="my-auto mx-1"
                    />
                    <p className="my-auto ml-3">
                      <Translate keyword="sign_out" />
                    </p>
                  </div>
                </button>
                <button
                  className={buttonClass}
                  onClick={() => {
                    refreshFunds();
                    dropdownRef.current && dropdownRef.current.close();
                  }}
                >
                  <div className="is-flex">
                    <FontAwesomeIcon
                      icon={faSyncAlt}
                      className="my-auto mx-1"
                    />
                    <p className="my-auto ml-3">
                      <Translate keyword="refresh_funds" />
                    </p>
                  </div>
                </button>
              </GhostDropdown>
            </div>
            {account && (
              <CopyDataButton data={account} buttonClass="button new-ghost">
                <AddressDisplay address={account} />
              </CopyDataButton>
            )}
          </div>
        </div>
        <div className="card mx-5">
          <div className="card-content bg-1">
            <div className="content has-text-centered">
              <p className="has-text-grey mb-0">
                {loading ? <Skeleton /> : <Translate keyword="total_balance" />}
              </p>
              <b className="is-size-4">
                {loading ? <Skeleton /> : `$${balance} USD`}
              </b>
            </div>
          </div>
          <footer className="card-footer">
            <button className="button is-info is-fullwidth is-top-radiusless is-medium">
              <Translate keyword="add_funds" />
            </button>
          </footer>
        </div>
      </div>
      {!big && (
        <div className="px-5 mb-5">
          <button
            className="button is-fullwidth is-info is-large"
            onClick={() => setShow(false)}
          >
            <Translate keyword="back" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowWalletMenu;
