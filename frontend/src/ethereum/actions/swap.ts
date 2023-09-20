import { BigNumberish, ethers } from 'ethers'
import { EthereumAddress } from 'types/ethereum'
import { getContracts } from 'utils/getContracts'
import uniswapV2Abi from 'ethereum/contracts/uniswap/v2/abi.json'
import { getSigner } from 'utils/getSigner'
import { getChainId } from 'utils/getChain'

export const handleUniswapV2 = async ({
  amountOutMin,
  path,
  to,
  deadline,
  signer,
  value,
}: {
  amountOutMin: BigNumberish
  path: EthereumAddress[]
  to: EthereumAddress
  deadline: BigNumberish
  signer: ethers.Signer
  value?: BigNumberish
}) => {
  const uniswapV2 = new ethers.Contract(getContracts(getChainId()).uniswapV2.address, uniswapV2Abi, signer)

  return await uniswapV2.swapExactETHForTokens(amountOutMin, path, to, deadline, {
    value,
  })
}

export const swapETHForGLM = async ({ value }: { value: BigNumberish }) => {
  const signer = await getSigner()
  //TODO : make it possible to pass Infinity or make this optional
  const deadline = BigInt('9223372036854775807') // 2^63 - 1

  const to = window.ethereum?.selectedAddress as EthereumAddress
  const chain = getChainId()
  const contracts = getContracts(chain)
  const path = [contracts.wrappedNativeToken.address, contracts.GLM.address]
  const amountOutMin = 0
  return await handleUniswapV2({
    amountOutMin,
    path,
    to,
    deadline,
    signer,
    value,
  })
}
