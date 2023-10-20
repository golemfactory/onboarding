// import { getContracts } from 'utils/getContracts'
// import { getExpectedBalances } from './testingPaths'
// import { getChainId } from 'utils/getChain'
// import { sendGolemToken, sendNativeToken } from 'ethereum/actions/transfer'
// import { JsonRpcSigner, ethers } from 'ethers'
// import { BalanceCaseType } from 'types/path'
// import { EthereumAddress } from 'types/ethereum'

// export const transferInitialBalances = async ({
//   testingPath,
//   address,
//   signer,
// }: {
//   testingPath: BalanceCaseType
//   address: EthereumAddress
//   signer: JsonRpcSigner
// }) => {
//   const balances = getExpectedBalances({ testingPath })
//   const golemAddress = getContracts(getChainId()).GLM.address

//   await sendGolemToken({
//     balance: ethers.parseEther(balances.glm.toString()),
//     signer,
//     address,
//     golemAddress,
//   })

//   await sendNativeToken({
//     balance: ethers.parseEther(balances.native.toString()),
//     signer,
//     address,
//   })

//   return balances
// }
