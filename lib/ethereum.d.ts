export interface EthereumProvider {
    request(arg0: { method: string; params: { chainId: string; chainName: string; nativeCurrency: { name: string; symbol: string; decimals: number; }; rpcUrls: string[]; blockExplorerUrls: string[]; }[]; });
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
  }
  
  declare global {
    interface Window {
      ethereum?: EthereumProvider
    }
  }