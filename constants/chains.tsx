export enum SupportedChainId {
    MAINNET = 1,
    ROPSTEN = 3,
    RINKEBY = 4,
    GOERLI = 5,
    KOVAN = 42,
  
    BSC = 56,
  
    BSC_TEST = 97,
  
    ARBITRUM_ONE = 42161,
    ARBITRUM_RINKEBY = 421611,
    OPTIMISM = 10,
    OPTIMISTIC_KOVAN = 69,
    MUMBAI=80001,
    LOCAL = 1337,
  }
  
  export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = [
    SupportedChainId.BSC,
    SupportedChainId.BSC_TEST,
  
    SupportedChainId.ROPSTEN,
    SupportedChainId.MUMBAI,
    SupportedChainId.LOCAL,
  ]
  