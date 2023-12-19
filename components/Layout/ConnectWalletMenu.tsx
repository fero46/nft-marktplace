import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useActiveWeb3React, useWalletAuth } from "../../hooks/web3";
import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError,
} from "@web3-react/injected-connector";
import { setupNetwork } from "../../utils/setupChain";
import { SupportedChainId } from "../../constants/chains";

import Image from "next/image";
import metaMaskLogo from "../../public/logos/metamask-logo.png";
import trustWalletLogo from "../../public/logos/trustwallet-logo.png";
import walletConnectLogo from "../../public/logos/walletconnect-logo.png";
import Translate from "../Text/Translate";
import { TailSpin } from "react-loader-spinner";

const metaMaskColor = "#f6851c";
const trustWalletColor = "#3375b9";
const walletConnectColor = "#3c99fb";
const light = "hsl(207, 53%, 97%)";

interface ConnectWalletMenuProps {
  big: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
}

const buttons = [
  {
    text: "Metamask",
    image: metaMaskLogo,
  },
  {
    text: "TrustWallet",
    image: trustWalletLogo,
  },
  {
    text: "WalletConnet",
    image: walletConnectLogo,
  },
];

const ConnectWalletMenu: React.FC<ConnectWalletMenuProps> = ({
  big,
  setShow,
}) => {
  const { error } = useActiveWeb3React();
  const { login, loading } = useWalletAuth();
  const [unsupportedChainId, setUnsupportedChainId] = useState(false);
  const [isInjected, setIsInjected] = useState(true);

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      setUnsupportedChainId(true);
      // Force user to switch BSC network
      setupNetwork(SupportedChainId.MUMBAI);
    } else if (error instanceof NoEthereumProviderError) {
      // Install ethereum provider
      // } else if (error?.name === "UserRejectedRequestError") {
      //   // logout();
      //   toast.error(
      //     "There is already a request. Just open your extension manually"
      //   );
    }
  }, [error]);

  useEffect(() => {
    if (!window.ethereum) setIsInjected(false);
  }, []);

  return (
    <div className="is-flex is-flex-direction-column is-justify-content-space-between">
      {isInjected ? (
        <div className="p-3">
          <div className="content has-text-black">
            <h1>
              <Translate keyword="select_a_wallet" />
            </h1>
            <p>
              <Translate keyword="select_tos" />
            </p>
          </div>

          {loading ? (
            <div className="is-flex is-fullwidth is-justify-content-center mt-5">
              <TailSpin color="#485fc7" />
            </div>
          ) : (
            <div className="box p-0">
              {buttons.map((b, i) => (
                <button
                  key={i}
                  onClick={() => login()}
                  className="button is-flex is-justify-content-space-between is-fullwidth py-5 is-radiusless"
                >
                  <b>{b.text}</b>
                  <div
                    className="is-relative is-block"
                    style={{ height: 36, width: "50px" }}
                  >
                    <Image
                      src={b.image}
                      layout="fill"
                      objectFit="contain"
                      alt={`${b.text} Logo`}
                      // className="py-2"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{ color: "white" }}>
          <Translate keyword="no_eth" />
        </div>
      )}
      {!big && setShow && (
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

export default ConnectWalletMenu;
