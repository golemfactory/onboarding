interface RequestArguments {
  method: string
  params?: unknown[] | object
}

export interface MetaMaskEthereumProvider {
  isConnected: () => boolean
  isMetaMask: boolean
  request: <T>(args: RequestArguments) => Promise<T>
  once(eventName: string | symbol, listener: (...args: any[]) => void): this
  on(eventName: string | symbol, listener: (...args: any[]) => void): this
  off(eventName: string | symbol, listener: (...args: any[]) => void): this
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void
  ): this
  removeAllListeners(event?: string | symbol): this
}

export interface INetwork {
  chainId: string
  chainName: string
  rpcUrls: string[]
  blockExplorerUrls: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
}

export type EthereumAddress = string & { __brand: 'EthereumAddress' }

export function assertEthereumAddress(x: string): asserts x is EthereumAddress {
  const regex = /^(0x)?[0-9a-fA-F]{40}$/

  if (!regex.test(x)) {
    throw new Error('Invalid ethereum account')
  }
}
