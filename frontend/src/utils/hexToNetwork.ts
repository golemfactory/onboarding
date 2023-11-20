import { Network, NetworkType } from 'types/ethereum'

export const hexToNetwork = (hex: string): NetworkType => {
  const network = Object.keys(Network).find(
    (key) => Network[key as keyof typeof Network] === hex
  ) as NetworkType
  if (!network) {
    throw new Error(`Invalid network hex ${hex}`)
  }
  return network
}
