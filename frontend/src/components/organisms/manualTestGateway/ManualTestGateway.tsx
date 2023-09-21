import { Paragraph, Button, HyperLink, Select } from 'components/atoms'
import { FC, useState } from 'react'
import { useSDK } from '@metamask/sdk-react'
import { CheckmarkIcon, XIcon } from 'components/atoms/icons'
import JSONDownloadButton from 'components/molecules/JSONDownLoadButton'
import storageTankJSON from 'assets/storage.tank.json'
import * as ethers from 'ethers'
import { testingSetup } from './testingPaths'
import { EthereumAddress, assertEthereumAddress } from 'types/ethereum'
import { transferInitialBalances } from './transfer'
import { WrongAccountModal } from './WrongAccountModal'
import { BalanceCaseType } from 'types/path'
import { useMetaMask } from 'components/providers/MetamaskProvider'

const createNewAccount = async () => {
  const randomWallet = ethers.Wallet.createRandom()
  return randomWallet
}

export const ManualTestGateway: FC = () => {
  const metamask = useMetaMask()
  const account = metamask.wallet.accounts[0]
  const [showModal, setShowModal] = useState(false)

  const [currentAccount, setCurrentAccount] = useState<EthereumAddress>('' as EthereumAddress)

  const [expectedAccount, setExpectedAccount] = useState<EthereumAddress>('' as EthereumAddress)

  const [createdAccount, setCreatedAccount] = useState(false)
  const [testingPath, setTestingPath] = useState<BalanceCaseType | null>(null)
  const isMetamaskInstalled = window.ethereum?.isMetaMask

  const [wallet, setWallet] = useState<ethers.HDNodeWallet>({} as ethers.HDNodeWallet)

  //TODO : divide into smaller pieces
  return (
    <div>
      <Paragraph>
        {isMetamaskInstalled ? (
          <>
            <CheckmarkIcon className="mr-4 text-green-400" />
            Metamask is installed
          </>
        ) : (
          <>
            <XIcon className="mr-4 text-red-400" />{' '}
            <Button
              onClick={() => {
                metamask.connect()
              }}
            >
              Install metamask
            </Button>
          </>
        )}
      </Paragraph>
      <Paragraph>
        {metamask.isConnected ? (
          <>
            <CheckmarkIcon className="mr-4 text-green-400" />
            Metamask is connected
          </>
        ) : (
          <>
            <XIcon className="mr-4 text-red-400" />{' '}
            <Button
              onClick={() => {
                metamask.connect()
              }}
            >
              Connect to metamask
            </Button>
          </>
        )}
      </Paragraph>
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
          <JSONDownloadButton jsonData={storageTankJSON} />
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
                //@ts-ignore
                params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
              })
              if (account !== `0x${storageTankJSON.address}`) {
                setCurrentAccount(account as EthereumAddress)
                setExpectedAccount(storageTankJSON.address as EthereumAddress)
                setShowModal(true)
              } else {
                setTestingPath(path)

                assertEthereumAddress(wallet.address)

                await transferInitialBalances({
                  testingPath: path,
                  address: wallet.address,
                  signer: await new ethers.BrowserProvider(window.ethereum).getSigner(account),
                })
              }

              //TODO: display some nice notifications here
            }}
          >
            <option className="text-opacity-50">choose </option>

            {(Object.keys(testingSetup) as Array<keyof typeof testingSetup>).map((testingPathKey) => {
              const testingPath = testingSetup[testingPathKey]
              return (
                <option key={testingPathKey} value={testingPathKey}>
                  {testingPath.label}
                </option>
              )
            })}
          </Select>
          Choose testing path. This will automatically set proper account balance on the newly created account
        </Paragraph>
      )}
      {testingPath && (
        <Paragraph>
          <Button
            onClick={() => {
              setCurrentAccount(account as EthereumAddress)
              setExpectedAccount(wallet.address as EthereumAddress)
              if (account?.toLocaleLowerCase() == wallet.address.toLowerCase()) {
                window.location.hash = '#/'
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
