import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const STAKING_ADDRESSES: AddressMap = {
  [SupportedChainId.ROPSTEN]: '',
  [SupportedChainId.BSC]: '',
  [SupportedChainId.BSC_TEST]: '',
 // [SupportedChainId.LOCAL]: process.env.REACT_APP_LOCAL_STAKING_ADDRESS,
}

export const NFTOP_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TEST]: '',
//  [SupportedChainId.LOCAL]: process.env.REACT_APP_LOCAL_NFTOPERATIONS_ADDRESS,
}

export const MEDUSE_ADDRESSES: AddressMap = {
  [SupportedChainId.BSC_TEST]: '',
//  [SupportedChainId.LOCAL]: process.env.REACT_APP_LOCAL_MEDUSE_ADDRESSES,
}
