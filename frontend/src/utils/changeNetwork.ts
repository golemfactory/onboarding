// import { getErrorCode } from 'types/error'
// import { networks } from 'ethereum/networks'
// import { switchNetwork } from './switchNetwork'
// import { addNetwork } from './addNetwork'

// export async function changeNetwork(network: keyof typeof networks) {
//   try {
//     await switchNetwork(network)
//   } catch (error) {
//     const code = getErrorCode(error)
//     if (code === 4902 || code === -32603) {
//       await addNetwork(network)
//       await switchNetwork(network)
//     }
//   }
// }
