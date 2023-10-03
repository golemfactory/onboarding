import { TokenCategory, TxStatus } from 'types/ethereum'
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
  status,
}: {
  amount: Amount
  setAmount: (newAmount: Amount) => void
  balance: bigint
  status: TxStatus
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

  return status === TxStatus.READY ? (
    <Slider {...sliderMaticProps} />
  ) : status === TxStatus.PENDING ? (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center">
        <div className="animate-spin ml-2 mr-2 h-6 w-6 rounded-full border-t-4 border-b-4 border-golemblue"></div>
        <div className="ml-2">{`Transferring ${
          amount[TokenCategory.NATIVE]
        } Matic`}</div>
      </div>
    </div>
  ) : (
    <div>Transferred ${amount[TokenCategory.NATIVE]} Matic</div>
  )
}

const SliderGLM = ({
  amount,
  setAmount,
  balance,
  status,
}: {
  amount: Amount
  setAmount: (newAmount: Amount) => void
  balance: bigint
  status: TxStatus
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

  return status === TxStatus.READY ? (
    <Slider {...sliderMaticProps} />
  ) : status === TxStatus.PENDING ? (
    <div className="flex justify-center items-center">
      <div className="relative flex items-center">
        <div className="animate-spin ml-2 mr-2 mt-4 h-6 w-6 rounded-full border-t-4 border-b-4 border-golemblue"></div>
        <div className="ml-2">{`Transferring ${
          amount[TokenCategory.GLM]
        } GLM`}</div>
      </div>
    </div>
  ) : (
    <div>Transferred ${amount[TokenCategory.GLM]} GLM</div>
  )
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
          <SliderGLM
            amount={amount}
            setAmount={setAmount}
            balance={wallet.balance.GLM}
            status={txStatus[TokenCategory.GLM]}
          />
          <SliderMatic
            amount={amount}
            setAmount={setAmount}
            balance={wallet.balance.NATIVE}
            status={txStatus[TokenCategory.NATIVE]}
          />
        </>
      }
    />
  )
}
