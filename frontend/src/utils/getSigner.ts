import { ethers } from 'ethers'

export const getSigner = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum)
  return await provider.getSigner(window.ethereum.selectedAddress)
}
