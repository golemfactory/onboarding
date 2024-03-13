import { TokenCategory, TxStatus } from 'types/ethereum'
import { settings } from 'settings'
import { getGLMToken } from 'utils/getGLMToken'
import { getNativeToken } from 'utils/getNativeToken'

import { useSupplyYagnaWallet } from 'hooks/useSupplyYagnaWallet'
import { useNetwork } from 'hooks/useNetwork'
import { useBalance } from 'hooks/useBalance'
import { TooltipProvider } from 'components/providers/Tooltip.provider'
import { Button, Trans } from 'components/atoms'
import { useEffect, useState } from 'react'
import { RecommendationCardTransfer } from 'components/molecules/recommendationCard/RecommendationCard'
import { IconInput } from 'components/atoms/iconInput/IconInput'
import { EthereumIcon, GolemCoinIcon } from 'components/atoms/icons'

import { MaticCoinSolidIcon } from 'components/atoms/icons/matic.icon'
import { formatEther } from 'viem'
import { useSetup } from 'components/providers'
import { AwaitTransaction } from 'components/molecules/awaitTransaction/AwaitTransaction'
import { TransactionError } from 'components/molecules/transactionError/TransactionError'
import debug from 'debug'
const log = debug('yagna:transfer')

TooltipProvider.registerTooltip({
  id: 'transfer',
  tooltip: {
    sections: [
      'explainHowYagnaWorks',
      'explainHowToGetYagna',
      'explainHowToTransfer',
    ],
    appearance: 'primary',
  },
})

type Amount = {
  [TokenCategory.GLM]: number
  [TokenCategory.NATIVE]: number
}

const NoYagnaPresentational = ({
  goToNextStep,
}: {
  goToNextStep: () => void
}) => {
  return (
    <div className="col-span-11 flex flex-col items-center mb-4">
      <div className="text-h4 text-primary">
        <Trans i18nKey="yagnaTransferTitle" ns="transfer.step" />
      </div>
      <div className="text-body-normal font-normal text-neutral-grey-300 px-24 text-center mt-4">
        <Trans i18nKey="yagnaTransferDescription" ns="transfer.step" />
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            window.open(
              'https://docs.golem.network/docs/providers/provider-installation',
              '_blank'
            )
          }}
          buttonStyle="outline"
          className="mt-10 px-9 py-4 text-button-large text-primary"
        >
          <Trans i18nKey="configureYagnaButton" ns="transfer.step" />
        </Button>
        <Button
          buttonStyle="solid"
          className="mt-10 text-white px-9 py-4 text-button-large "
          onClick={goToNextStep}
        >
          <Trans i18nKey="skipButton" ns="transfer.step" />
        </Button>
      </div>
    </div>
  )
}

const TransferPresentational = ({
  amount,
  setAmount,
  nativeToken,
  send,
  error,
  status,
}: {
  nativeToken: string
  amount: Amount
  setAmount: (amount: Amount) => void
  send: () => void
  status: 'ready' | 'waitingForSignature' | 'waitingForTransaction' | 'error'
  error: {
    [TokenCategory.GLM]: string
    [TokenCategory.NATIVE]: string
  }
}) => {
  return (
    <div>
      {(status === 'ready' || status === 'error') && (
        <div className="flex flex-col gap-6 pb-8">
          <RecommendationCardTransfer />
          <div className="text-h4 text-primary pl-8 pr-8 mb-8">
            <div className="grid grid-cols-4 pr-10">
              <div className="col-span-3 flex flex-col">
                <Trans i18nKey="transferAmount" ns="transfer.step" />

                <IconInput
                  icon={GolemCoinIcon}
                  label="GLM"
                  placeholder={`0`}
                  isError={!!error[TokenCategory.GLM]}
                  onChange={(e) => {
                    const value = parseFloat(e.currentTarget.value) || 0
                    setAmount({
                      ...amount,
                      [TokenCategory.GLM]: value,
                    })
                  }}
                />
                {error[TokenCategory.GLM] && (
                  <div className="text-dangerred-200 text-body-normal font-normal">
                    {error[TokenCategory.GLM]}
                  </div>
                )}
                <IconInput
                  icon={
                    nativeToken === 'MATIC' ? MaticCoinSolidIcon : EthereumIcon
                  }
                  label={nativeToken}
                  placeholder={`0`}
                  isError={!!error[TokenCategory.NATIVE]}
                  onChange={(e) => {
                    const value = parseFloat(e.currentTarget.value) || 0
                    setAmount({
                      ...amount,
                      [TokenCategory.NATIVE]: value,
                    })
                  }}
                />
                {error[TokenCategory.NATIVE] && (
                  <div className="text-dangerred-200 text-body-normal font-normal">
                    {error[TokenCategory.NATIVE]}
                  </div>
                )}
                <div>
                  <Button
                    buttonStyle="solid"
                    className="mt-10 text-white px-9 py-4 text-button-large"
                    disabled={
                      !!error[TokenCategory.GLM] ||
                      !!error[TokenCategory.NATIVE]
                    }
                    onClick={send}
                  >
                    <Trans i18nKey="transferButtonText" ns="transfer.step" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {status === 'error' && <TransactionError />}
        </div>
      )}
      {status === 'waitingForSignature' && (
        <AwaitTransaction mode="confirmation" />
      )}
      {status === 'waitingForTransaction' && (
        <AwaitTransaction mode="transaction" />
      )}
    </div>
  )
}

export const Transfer = ({ goToNextStep }: { goToNextStep: () => void }) => {
  const balance = useBalance()
  const { send, txStatus } = useSupplyYagnaWallet()
  const { yagnaAddress } = useSetup()
  const [status, setStatus] = useState<
    'ready' | 'waitingForSignature' | 'waitingForTransaction' | 'error'
  >('ready')
  const { chain } = useNetwork()

  if (!chain?.id) {
    throw new Error('Chain not found')
  }

  useEffect(() => {
    //control button loading state s
    if (
      txStatus[TokenCategory.GLM] === TxStatus.PENDING ||
      txStatus[TokenCategory.NATIVE] === TxStatus.PENDING
    ) {
      setStatus('waitingForSignature')
    }

    if (
      txStatus[TokenCategory.GLM] === TxStatus.LOADING &&
      txStatus[TokenCategory.NATIVE] === TxStatus.LOADING
    ) {
      setStatus('waitingForTransaction')
    }
    //continue flow when both transactions are successful
    if (
      txStatus[TokenCategory.GLM] === TxStatus.SUCCESS &&
      txStatus[TokenCategory.NATIVE] === TxStatus.SUCCESS
    ) {
      goToNextStep()
    }

    if (
      txStatus[TokenCategory.GLM] === TxStatus.ERROR ||
      txStatus[TokenCategory.NATIVE] === TxStatus.ERROR
    ) {
      setStatus('error')
    }
  }, [txStatus, goToNextStep])

  const [error, setError] = useState({
    [TokenCategory.GLM]: '',
    [TokenCategory.NATIVE]: '',
  })
  const nativeToken = getNativeToken(chain.id).split('_')[0]
  const [amount, setAmount] = useState<Amount>({
    [TokenCategory.GLM]: undefined,
    [TokenCategory.NATIVE]: undefined,
  })

  const minimaAmounts = {
    [TokenCategory.GLM]: settings.minimalBalance[getGLMToken(chain.id).symbol],
    [TokenCategory.NATIVE]: settings.minimalBalance[getNativeToken(chain.id)],
  }

  const [glmBalance, setGlmBalance] = useState(
    Number(formatEther(balance[TokenCategory.GLM]))
  )

  const [nativeBalance, setNativeBalance] = useState(
    Number(formatEther(balance[TokenCategory.NATIVE]))
  )

  useEffect(() => {
    setGlmBalance(Number(formatEther(balance[TokenCategory.GLM])))
    setNativeBalance(Number(formatEther(balance[TokenCategory.NATIVE])))
  }, [balance])

  useEffect(() => {
    console.log('')
    const glmAmount = amount[TokenCategory.GLM]
    const nativeAmount = amount[TokenCategory.NATIVE]

    const glmMininimalBalance = minimaAmounts[TokenCategory.GLM]
    const nativeMininimalBalance = minimaAmounts[TokenCategory.NATIVE]

    log('glmAmount', glmAmount)
    log('glmBalance', glmBalance)
    log('nativeAmount', nativeAmount)
    log('nativeBalance', nativeBalance)
    log('glmMininimalBalance', glmMininimalBalance)
    log('nativeMininimalBalance', nativeMininimalBalance)
    //TODO : regfactor to use more delclarative code
    if (glmAmount > glmBalance) {
      setError({
        ...error,
        [TokenCategory.GLM]: 'Not enough GLM',
      })
    }

    if (glmAmount < glmMininimalBalance) {
      setError({
        ...error,
        [TokenCategory.GLM]: 'Minimal amount is ' + glmMininimalBalance,
      })
    }

    if (nativeAmount > nativeBalance) {
      setError({
        ...error,
        [TokenCategory.NATIVE]: 'Not enough ' + nativeToken,
      })
    }

    if (nativeAmount < nativeMininimalBalance) {
      console.log('delete error native')
      setError({
        ...error,
        [TokenCategory.NATIVE]: 'Minimal amount is ' + nativeMininimalBalance,
      })
    }

    if (glmAmount <= glmBalance && glmAmount >= glmMininimalBalance) {
      log('no glm errors')
      setError({
        ...error,
        [TokenCategory.GLM]: '',
      })
    }

    if (
      nativeAmount <= nativeBalance &&
      nativeAmount >= nativeMininimalBalance
    ) {
      log('no native errors')
      setError({
        ...error,
        [TokenCategory.NATIVE]: '',
      })
    }
  }, [
    amount[TokenCategory.GLM],
    amount[TokenCategory.NATIVE],
    glmBalance,
    nativeBalance,
  ])

  return (
    <>
      {!!yagnaAddress ? (
        <TransferPresentational
          setAmount={setAmount}
          amount={amount}
          nativeToken={nativeToken}
          status={status}
          error={error}
          send={() => {
            send(amount)
          }}
        />
      ) : (
        <NoYagnaPresentational goToNextStep={goToNextStep} />
      )}{' '}
    </>
  )
}
