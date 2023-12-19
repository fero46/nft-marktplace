import { Web3Provider } from "@ethersproject/providers";
import {
  UnsupportedChainIdError,
  useWeb3React as useWeb3ReactCore,
} from "@web3-react/core";
import type { EthereumProvider } from "../lib/ethereum";

import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { injected } from "../connectors";
import { BigNumber } from "ethers";
// import * as walletsApi from '../api/v1/wallets'
// import { useAuth } from './useAuth'

export function useActiveWeb3React(): Web3ReactContextInterface<Web3Provider> {
  return useWeb3ReactCore<Web3Provider>();
}

export function useEagerConnect() {
  const { activate, active } = useWeb3ReactCore(); // specifically using useWeb3ReactCore because of what this hook does
  const [tried, setTried] = useState(false);

  useEffect(() => {
    const activatedWallet = localStorage.getItem("wallet");

    if (!active) {
      injected.isAuthorized().then((isAuthorized: any) => {
        if (isAuthorized && activatedWallet) {
          activate(injected, undefined, true).catch(() => {
            setTried(true);
          });
        } else {
          if (isMobile && window.ethereum) {
            activate(injected, undefined, true).catch(() => {
              setTried(true);
            });
          } else {
            setTried(true);
          }
        }
      });
    }
  }, [activate, active]); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true);
    }
  }, [active]);

  return tried;
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore(); // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const ethereum = window.ethereum as EthereumProvider | undefined;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch((error) => {
          console.error("Failed to activate after chain changed", error);
        });
      };

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch((error) => {
            console.error("Failed to activate after accounts changed", error);
          });
        }
      };

      const handleDisconnect = () => {
        if (localStorage.getItem("user")) localStorage.removeItem("user");
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("disconnect", handleDisconnect);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
        }
      };
    }
    return undefined;
  }, [active, error, suppress, activate]);
}

export const useWalletAuth = () => {
  const { library, chainId, account, activate, deactivate, error, active } =
    useActiveWeb3React();
  // const { user } = useAuth()

  const [loading, setLoading] = useState(true);
  const [unsupportedChainId, setUnsupportedChainId] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("chainId: ", chainId);
      console.log("library: ", library);
      console.log("account: ", account);
    }
    //  if (user && account) walletsApi.checkWallet(user, account)
    setLoading(false);
    //[library, chainId, account, user]
  }, [library, chainId, account]);

  useEffect(() => {
    if (error instanceof UnsupportedChainIdError) {
      setUnsupportedChainId(true);

      if (process.env.NODE_ENV === "development") {
        console.log("Unsupported chain id");
      }
    } else {
      // console.error(error)
    }

    setLoading(false);
  }, [error]);

  const getBalance = useCallback(async () => {
    if (active && library && account) {
      let b = await library.getBalance(account);
      return b.toString();
    }
  }, [active, library, account]);

  const login = useCallback(async () => {
    setLoading(true);
    await activate(injected)
      .then(() => {
        injected.isAuthorized().then(() => {
          localStorage.setItem("wallet", "injected");
        });
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  }, [activate]);

  const logout = useCallback(() => {
    // setLoading(true); not needed because it is instant
    deactivate();
    localStorage.removeItem("wallet");
  }, [deactivate]);

  return {
    login,
    logout,
    loading,
    unsupportedChainId,
    getBalance,
    account,
  };
};
