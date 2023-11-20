import { Network, NetworkType } from 'types/ethereum'
import { hexToNumber, numberToHex } from 'viem'

export const networkToHex = (network: string): NetworkType => {
  //allowed are numeric hex of case-insensitive network name
  const allowedValue: string[] = (Object.values(Network) as string[])
    .concat(Object.keys(Network) as string[])
    .concat(
      Object.values(Network).map((hexValue) => hexToNumber(hexValue).toString())
    )

  //find matching hex or name
  const hexOrName = allowedValue.find((allowedNetwork) => {
    return allowedNetwork.toLowerCase() === network.toLowerCase()
  })

  if (!hexOrName) {
    throw new Error(`Invalid network ${network}`)
  }
  //return hex
  return (
    Network[hexOrName?.toUpperCase() as keyof typeof Network] ||
    numberToHex(Number(hexOrName))
  )
}
