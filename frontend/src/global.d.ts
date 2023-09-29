export {}
declare global {
  // eslint-disable-next-line no-var
  var APP_VERSION: string
  interface Window {
    //@ts-ignore
    ethereum: import('./types/ethereum.js').MetaMaskEthereumProvider
  }
}
