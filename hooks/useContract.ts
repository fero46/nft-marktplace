import { Contract } from "@ethersproject/contracts";
import { useEffect, useMemo, useState } from "react";
import { getContract } from "../utils";
import { useActiveWeb3React } from "./web3";
/* import { ERC20, Staking, MeduseNFTOperations, LEXIT } from '../contracts/types'
import ERC20_ARTIFACT from '../contracts/ERC20.json'
import STAKING_ARTIFACT from '../contracts/Staking.json'
import LEXIT_ARTIFACT from '../contracts/LEXIT.json'
import NFT_ARTIFACT from '../contracts/MeduseNFTOperations.json' */
import {
  STAKING_ADDRESSES,
  NFTOP_ADDRESSES,
  MEDUSE_ADDRESSES,
} from "../constants/addresses";

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(
        address,
        ABI,
        library,
        withSignerIfPossible && account ? account : undefined
      );
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [
    addressOrAddressMap,
    ABI,
    library,
    chainId,
    withSignerIfPossible,
    account,
  ]) as T;
}

/* export function useTokenContractWithPromise(
  tokenAddressGetter?: () => Promise<string>,
  withSignerIfPossible?: boolean
) {
  const [tokenAddress, setTokenAddress] = useState<string>('')

  useEffect(() => {
    if (tokenAddressGetter) tokenAddressGetter().then(setTokenAddress)
  }, [tokenAddressGetter])

  return useContract<ERC20>(
    tokenAddress,
    ERC20_ARTIFACT.abi,
    withSignerIfPossible
  )
}

export function useStakingContract(withSignerIfPossible?: boolean) {
  return useContract<Staking>(
    STAKING_ADDRESSES,
    STAKING_ARTIFACT.abi,
    withSignerIfPossible
  )
}

export function useNFTContract(withSignerIfPossible?: boolean) {
  return useContract<MeduseNFTOperations>(
    NFTOP_ADDRESSES,
    NFT_ARTIFACT.abi,
    withSignerIfPossible
  )
}

export function useLEXITContract(withSignerIfPossible?: boolean) {
  return useContract<LEXIT>(
    LEXIT_ADDRESSES,
    LEXIT_ARTIFACT.abi,
    withSignerIfPossible
  )
} */
