import { ethers } from 'ethers'
import erc20Abi from 'ethereum/contracts/erc20token/abi.json'
import { GLM } from 'ethereum/tokens/glm/GLM'
import { OnboardingContextData } from 'types/dataContext'
import { BalanceCase } from 'types/path'

//TODO maybe change those values and move them to config
const minimalBalanceETH = 0.1
const minimalBalanceGLM = 100

const balanceToNumber = (balance: bigint) => Number(ethers.formatEther(balance))

export const checkAccount = async (context: OnboardingContextData): Promise<BalanceCase | undefined> => {
  //TODO provide better abstraction for working with ethereum

  const network = context.sdk?.activeProvider?.chainId

  //TODO : handle the case
  if (!network) {
    return
  }
  const golemAddress = GLM.getAddress(network)

  const provider = new ethers.BrowserProvider(window.ethereum)
  const address = context.sdk?.activeProvider?.selectedAddress

  //TODO : handle the case
  if (!address) {
    return
  }

  const signer = await new ethers.BrowserProvider(window.ethereum).getSigner(address)
  const tokenContract = new ethers.Contract(golemAddress, erc20Abi, signer)

  const ETH_balance = await provider.getBalance(address)

  const GLM_Balance = await tokenContract.balanceOf(address)
  if (balanceToNumber(GLM_Balance) < minimalBalanceGLM && balanceToNumber(ETH_balance) < minimalBalanceETH) {
    return BalanceCase.NO_GLM_NO_MATIC
  } else if (balanceToNumber(GLM_Balance) < minimalBalanceGLM) {
    return BalanceCase.NO_GLM
  } else if (balanceToNumber(ETH_balance) < minimalBalanceETH) {
    return BalanceCase.NO_MATIC
  } else {
    return BalanceCase.BOTH
  }
}
