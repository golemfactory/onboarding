import { formatEther as viemFormatEther } from 'viem'

export const formatEther = ({
  wei,
  precision = 18,
}: {
  wei: bigint
  precision?: number
}) => {
  return parseFloat(viemFormatEther(wei)).toFixed(precision).toString()
}
