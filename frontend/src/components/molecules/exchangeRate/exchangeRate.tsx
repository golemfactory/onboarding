export const ExchangeRate = ({
  amountIn,
  amountOut,
}: {
  amountIn: number
  amountOut: number
}) => {
  return (
    <div className="text-body-small-light text-neutral-grey-300 mt-2">
      {amountIn} MATIC ≈ {amountOut} GLM
    </div>
  )
}
