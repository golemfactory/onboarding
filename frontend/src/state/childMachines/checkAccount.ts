import { ethers } from 'ethers'
import erc20Abi from 'ethereum/contracts/erc20token/abi.json'
import { GLM } from 'ethereum/tokens/glm/GLM'
import { Network, Token } from 'types/ethereum'

//TODO maybe change those values and move them to config
const minimalBalanceETH = 0.1
const minimalBalanceGLM = 100

const balanceToNumber = (balance: bigint) => Number(ethers.formatEther(balance))

export const checkAccount = async (context: any) => {
  const network = Network.MUMBAI
  const golemAddress = GLM.getAddress(network)

  const provider = new ethers.BrowserProvider(window.ethereum)
  const address = context.sdk.activeProvider.selectedAddress

  const signer = await new ethers.BrowserProvider(window.ethereum).getSigner(address)
  const tokenContract = new ethers.Contract(golemAddress, erc20Abi, signer)

  const ETH_balance = await provider.getBalance(address)

  const GLM_Balance = await tokenContract.balanceOf(address)

  return {
    [Token.GLM]: balanceToNumber(GLM_Balance),
    [Token.ETH]: balanceToNumber(ETH_balance),
  }
}
