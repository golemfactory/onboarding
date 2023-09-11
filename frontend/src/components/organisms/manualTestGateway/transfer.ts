import { testingPath, testingSetup } from './testingPaths'
import { EthereumAddress } from 'types/ethereum'

export const transferInitialAmount = ({
  testingPath,
  address,
}: {
  testingPath: testingPath
  address: EthereumAddress
}) => {
  console.log('transferInitialAmount', testingPath, address)
}
