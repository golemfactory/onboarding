'utils/formatBalance'
import { useSetup } from 'components/providers'
import {
  CheckCircleIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid'
import { Trans } from 'components/atoms'

import style from './Finish.step.module.css'
import {
  AccountCategory,
  WalletState,
} from 'components/molecules/walletState/walletState'
import { useWallet } from 'hooks/useWallet'
import { EthereumAddress } from 'types/ethereum'
import { useAccount } from 'hooks/useAccount'
import { RightDot } from 'components/atoms/ornaments/rightDot'
import { Card, CardDataType } from 'components/molecules/useCaseCard/Card'
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import { ArrowsExpandIcon, TerminalIcon } from 'components/atoms/icons'

const useCases: CardDataType[] = [
  {
    title: 'developCaseTitle',
    description: 'developCaseDescription',
    icon: CodeBracketIcon,
    exploreLink: 'https://docs.golem.network/docs/creators',
    namespace: 'finish.step',
    appearance: 'finish',
    buttonText: 'Develop',
  },
  {
    title: 'deployCaseTitle',
    description: 'deployCaseDescription',
    icon: TerminalIcon,
    exploreLink: 'https://docs.golem.network/docs/creators/dapps',
    namespace: 'finish.step',
    appearance: 'finish',
    buttonText: 'Deploy',
  },
  {
    title: 'distributeCaseTitle',
    description: 'distributeCaseDescription',
    icon: ArrowsExpandIcon,
    exploreLink: 'https://docs.golem.network/docs/creators/ray',
    namespace: 'finish.step',
    appearance: 'finish',
    buttonText: 'Distribute',
  },
  {
    title: 'runCaseTitle',
    description: 'runCaseDescription',
    icon: ChevronDoubleRightIcon,
    badge: 'InternalAlfa',
    namespace: 'finish.step',
    appearance: 'finish',
    exploreLink: 'https://github.com/golemfactory/golem-kernel-python',
    buttonText: 'Run',
  },
]

const FinishPresentationalYagna = ({
  walletProvider,
  address,
  yagnaAddress,
}: {
  yagnaAddress: EthereumAddress
  address: EthereumAddress
  walletProvider: ReturnType<typeof useWallet>
}) => {
  return (
    <div>
      <RightDot top={'400px'} />
      <div className="justify-center flex flex-col text-center gap-3">
        <CheckCircleIcon className=" h-10 text-success-100" />
        <div className="text-h1">
          <Trans i18nKey="congratulations" ns="finish.step" />
        </div>
        <div className="text-h4">
          <Trans i18nKey="successMessage" ns="finish.step" />
        </div>
        <div className="flex justify-center">
          <div className={style.fadingLine}></div>
        </div>
        <div className="text-h4 mb-16">
          <Trans i18nKey="walletsSummary" ns="finish.step" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className={`col-span-4 col-start-3 ${style.wrapper}`}>
            <div className={`${style.card} `}>
              <WalletState
                category={AccountCategory.BROWSER_WALLET}
                provider={walletProvider}
                address={address}
              />
            </div>
          </div>
          <div className={`col-span-4  ${style.wrapper}`}>
            <div className={`bg-lightblue-200 ${style.card} `}>
              <WalletState
                category={AccountCategory.YAGNA}
                address={yagnaAddress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BudgetCardSummary = () => {
  const time = 24
  return (
    <div className={`${style.budgetCard}`}>
      <div className="text-body-normal text-left">
        <Trans i18nKey="budgetSummaryTitle" ns="finish.step" />
      </div>
      <div className="flex justify-center items-baseline">
        <div className="text-h1">{time}</div>
        <div className="text-h3">h</div>
      </div>
      <div className="text-body-normal text-left">
        <Trans i18nKey="budgetSummaryDescription" ns="finish.step" />
      </div>
    </div>
  )
}

const FinishPresentationalNoYagna = ({
  walletProvider,
  address,
}: {
  address: EthereumAddress
  walletProvider: ReturnType<typeof useWallet>
}) => {
  return (
    <div>
      <RightDot top={'400px'} />
      <div className="justify-center flex flex-col text-center gap-3">
        <CheckCircleIcon className=" h-10 text-success-100" />
        <div className="text-h1">
          <Trans i18nKey="congratulations" ns="finish.step" />
        </div>
        <div className="text-h4">
          <Trans i18nKey="successMessage" ns="finish.step" />
        </div>
        <div className="flex justify-center">
          <div className={style.fadingLine}></div>
        </div>
        <div className="text-h4 mb-16">
          <Trans i18nKey="walletsSummary" ns="finish.step" />
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className={`col-span-4 col-start-3 ${style.wrapper}`}>
            <div className={`${style.card} `}>
              <WalletState
                category={AccountCategory.BROWSER_WALLET}
                provider={walletProvider}
                address={address}
              />
            </div>
          </div>
          <div className={`col-span-4  ${style.wrapper}`}>
            <BudgetCardSummary />
          </div>
        </div>
        <div className="flex justify-center">
          <div className={style.fadingLine}></div>
        </div>
        <div className="text-h3">
          <Trans i18nKey="nextStepTitle" ns="finish.step" />
        </div>
        <div className="text-body-normal text-neutral-grey-300 px-48 mb-8">
          <Trans i18nKey="nextStepDescription" ns="finish.step" />
        </div>
        <div className="grid gap-3 grid-cols-12">
          {useCases.map((useCase) => {
            return (
              <div className="col-span-3" key={`useCase_${useCase.title}`}>
                <Card {...useCase} style={style} />
              </div>
            )
          })}
        </div>
        <div className="text-h3 mt-30 mb-12">
          <Trans i18nKey="community" ns="finish.step" />
        </div>
        <div className="flex justify-center gap-8">
          <a
            href="https://chat.golem.network/"
            target="_blank"
            rel="noreferrer"
            className={style.buttonWrapper}
          >
            <div className={style.communityButton}>
              <img className="h-6" src="discord.svg"></img>
              Join our Discord Group
            </div>
          </a>
          <a
            href="https://www.youtube.com/@GolemNetwork"
            target="_blank"
            rel="noreferrer"
            className={style.buttonWrapper}
          >
            <div className={style.communityButton}>
              <img className="h-6" src="youtube.svg"></img>
              Check our YouTube
            </div>
          </a>
          <a
            className={style.buttonWrapper}
            href="https://docs.golem.network/"
            target="_blank"
            rel="noreferrer"
          >
            <div className={style.communityButton}>
              <img className="h-6 inline" src="golem-docs-logo.svg"></img>
              Go to our Docs Website
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export const Finish = () => {
  const walletProvider = useWallet()
  const { address } = useAccount()
  const { yagnaAddress } = useSetup()

  if (!address) {
    throw new Error('Address is not defined')
  }

  const isYagnaProvided = !!yagnaAddress

  return (
    <div className="col-span-12 text-primary">
      {isYagnaProvided ? (
        <FinishPresentationalYagna
          walletProvider={walletProvider}
          address={address}
          yagnaAddress={yagnaAddress}
        />
      ) : (
        <FinishPresentationalNoYagna
          walletProvider={walletProvider}
          address={address}
        />
      )}
    </div>
  )
}
