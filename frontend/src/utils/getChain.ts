export const getChain = () => {
  console.log('gettomg', window.ethereum.chainId)
  return window.ethereum.chainId
}
