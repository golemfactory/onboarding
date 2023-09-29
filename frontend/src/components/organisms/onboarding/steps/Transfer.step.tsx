import { TokenCategory } from 'types/ethereum'
import { ThemesManager } from '../../../../themes/ThemesManager'
import { settings } from 'settings'
import { getGLMToken } from 'utils/getGLMToken'
import { getNativeToken } from 'utils/getNativeToken'
import { ChangeEvent, useState } from 'react'
import { useMetaMask } from 'components/providers'
import { Slider } from 'components/atoms/slider/slider'
import { formatEther } from 'ethers'
import { useSupplyYagnaWallet } from 'ethereum/actions/transfer'

type Amount = {
  [TokenCategory.GLM]: number
  [TokenCategory.NATIVE]: number
}

const SliderMatic = ({
  amount,
  setAmount,
  balance,
}: {
  amount: Amount
  setAmount: (newAmount: Amount) => void
  balance: bigint
}) => {
  const sliderMaticProps = {
    min: settings.minimalBalance[getNativeToken()],
    step: 0.011,
    max: parseFloat(formatEther(balance)).toFixed(2),
    label: '',
    value: amount[TokenCategory.NATIVE],
    displayValue: (v: number) => `Transfer ${v} Matic`,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.currentTarget.value)
      setAmount({ ...amount, [TokenCategory.NATIVE]: value })
    },
  }

  return <Slider {...sliderMaticProps} />
}

const SliderGLM = ({
  amount,
  setAmount,
  balance,
}: {
  amount: Amount
  setAmount: (newAmount: Amount) => void
  balance: bigint
}) => {
  const sliderMaticProps = {
    min: settings.minimalBalance[getGLMToken().symbol],
    step: 0.01,
    max: parseFloat(formatEther(balance)).toFixed(2),
    label: '',
    value: amount[TokenCategory.GLM],
    displayValue: (v: number) => `Transfer ${v} GLM`,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(e.currentTarget.value)
      setAmount({ ...amount, [TokenCategory.GLM]: value })
    },
  }

  return <Slider {...sliderMaticProps} />
}

export const Transfer = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const { wallet } = useMetaMask()
  const { send, txStatus } = useSupplyYagnaWallet()
  const [amount, setAmount] = useState<Amount>({
    [TokenCategory.GLM]: settings.minimalBalance[getGLMToken().symbol],
    [TokenCategory.NATIVE]: settings.minimalBalance[getNativeToken()],
  })

  const StepTemplate = ThemesManager.getInstance()
    .getActiveTheme()
    .getStepTemplate()

  const onConfirm = async () => {
    await send(amount)
    goToNextStep()
  }

  console.log(txStatus)

  return (
    <StepTemplate
      onConfirm={onConfirm}
      title={'Yagna wallet transfer'}
      buttonText={'Transfer'}
      content={
        <>
          <br></br>
          <div>Transfer tokens to your Yagna wallet</div>
          <br></br>
          <SliderMatic
            amount={amount}
            setAmount={setAmount}
            balance={wallet.balance.NATIVE}
          />
          <SliderGLM
            amount={amount}
            setAmount={setAmount}
            balance={wallet.balance.GLM}
          />
        </>
      }
    />
  )
}
