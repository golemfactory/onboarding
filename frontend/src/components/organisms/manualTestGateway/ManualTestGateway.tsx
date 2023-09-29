import { Paragraph, Button, HyperLink, Select } from 'components/atoms'
import { useState } from 'react'
import JSONDownloadButton from 'components/molecules/jsonDownloadButton/JSONDownloadButton'
import storageTankJSON from 'assets/storage.tank.json'
import * as ethers from 'ethers'
import { testingSetup } from './testingPaths'
import { EthereumAddress, assertEthereumAddress } from 'types/ethereum'
import { transferInitialBalances } from '../../../ethereum/actions/transfer'
import { WrongAccountModal } from './WrongAccountModal'
import { BalanceCase, BalanceCaseType } from 'types/path'
import { useMetaMask } from 'components/providers'
import { SkipableStepType } from 'state/steps'
import styles from './ManualTesting.module.css'
import { getGLMToken } from 'utils/getGLMToken'
import { SkipStepSelection } from './SkipStepSelection'
const createNewAccount = async () => {
  const randomWallet = ethers.Wallet.createRandom()
  return randomWallet
}

export const ManualTestGateway = () => {
  const metamask = useMetaMask()
  const account = metamask.wallet.accounts[0]
  const [showModal, setShowModal] = useState(false)

  const [currentAccount, setCurrentAccount] = useState<EthereumAddress>(
    '' as EthereumAddress
  )

  const [expectedAccount, setExpectedAccount] = useState<EthereumAddress>(
    '' as EthereumAddress
  )

  const [createdAccount, setCreatedAccount] = useState(false)
  const [testingPath, setTestingPath] = useState<BalanceCaseType | null>(null)

  const [wallet, setWallet] = useState<ethers.HDNodeWallet>(
    {} as ethers.HDNodeWallet
  )

  const [ignoredSteps, setIgnoredSteps] = useState<SkipableStepType[]>([])

  const handleStepToggle = (step: SkipableStepType) => {
    if (ignoredSteps.includes(step)) {
      // Remove the step if it's already in the ignored list
      setIgnoredSteps(ignoredSteps.filter((s) => s !== step))
    } else {
      // Add the step to the ignored list if it's not already there
      setIgnoredSteps([...ignoredSteps, step])
    }
  }

  //TODO : divide into smaller pieces
  return (
    <div
      className={`${styles.golemBackground} fixed inset-0 items-center justify-center`}
    >
      {createdAccount && (
        <Paragraph style={{ display: 'block' }} className="pt-2">
          <div className="font-bold"> Created new account </div>
          <div>
            <b>wallet.address:</b> {wallet.address}
          </div>
          <div>
            <b>wallet.privateKey:</b> {wallet.privateKey}
          </div>
          <div>
            Import by private key instructions you can find{' '}
            <HyperLink
              link={
                'https://support.metamask.io/hc/en-us/articles/360015489331-How-to-import-an-account#h_01G01W07NV7Q94M7P1EBD5BYM4'
              }
              text={'here'}
            ></HyperLink>
          </div>
        </Paragraph>
      )}
      {!createdAccount && (
        <Paragraph>
          <Button
            onClick={async () => {
              setWallet(await createNewAccount())
              setCreatedAccount(true)
            }}
          >
            Create new account
          </Button>
        </Paragraph>
      )}
      <Paragraph>
        <>
          <JSONDownloadButton
            jsonData={storageTankJSON}
            fileName="storage-tank.json"
          />
          <div className="ml-4">
            JSON file and then import it as described{' '}
            <HyperLink
              link={
                'https://support.metamask.io/hc/en-us/articles/360015489331-How-to-import-an-account#h_01G01W0D3TGE72A7ZBV0FMSZX1'
              }
              text={'here'}
            ></HyperLink>
          </div>
        </>
      </Paragraph>
      {createdAccount && (
        <Paragraph>
          <Select
            className="mr-10"
            onChange={async (e) => {
              //TODO: avoid using as here
              const path = e.currentTarget.value as BalanceCaseType
              const CHAIN_ID = 80001
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
              })

              if (
                path !== BalanceCase.NO_GLM_NO_MATIC &&
                account !== `0x${storageTankJSON.address}`
              ) {
                setCurrentAccount(account as EthereumAddress)
                setExpectedAccount(storageTankJSON.address as EthereumAddress)
                setShowModal(true)
              } else {
                setTestingPath(path)

                assertEthereumAddress(wallet.address)

                await transferInitialBalances({
                  testingPath: path,
                  address: wallet.address,
                  signer: await new ethers.BrowserProvider(
                    window.ethereum
                  ).getSigner(account),
                })
              }

              //TODO: display some nice notifications here
            }}
          >
            {(
              Object.keys(testingSetup) as Array<keyof typeof testingSetup>
            ).map((testingPathKey) => {
              return (
                <option key={testingPathKey} value={testingPathKey}>
                  {testingSetup[testingPathKey].label}
                </option>
              )
            })}
          </Select>
          Choose testing path. This will automatically set proper account
          balance on the newly created account
          <div className="ml-4"></div>
        </Paragraph>
      )}
      <Paragraph>
        <SkipStepSelection
          handleStepToggle={handleStepToggle}
          ignoredSteps={ignoredSteps}
        />
      </Paragraph>
      {testingPath && (
        <Paragraph>
          <Button
            onClick={async () => {
              setCurrentAccount(account as EthereumAddress)
              setExpectedAccount(wallet.address as EthereumAddress)
              if (
                account?.toLocaleLowerCase() === wallet.address.toLowerCase()
              ) {
                const { address, decimals, symbol } = await getGLMToken()

                await window.ethereum.request({
                  method: 'wallet_watchAsset',
                  params: {
                    type: 'ERC20',
                    options: { address, decimals, symbol },
                  },
                })
                const search = new URLSearchParams(window.location.search)
                ignoredSteps.forEach((step) => {
                  search.append('skip-steps', step)
                })
                window.location.hash = '#/'
                window.location.search = search.toString()
              } else {
                setShowModal(true)
              }
            }}
          >
            {' '}
            Start testing{' '}
          </Button>
        </Paragraph>
      )}

      <WrongAccountModal
        showModal={showModal}
        setShowModal={setShowModal}
        currentAccount={currentAccount}
        expectedAccount={expectedAccount}
      />
    </div>
  )
}
