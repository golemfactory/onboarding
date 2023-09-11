import { Paragraph, Button, HyperLink, Select } from 'components/atoms'
import { FC, useState } from 'react'
import { useSDK } from '@metamask/sdk-react'
import { CheckmarkIcon, XIcon } from 'components/atoms/icons'
import JSONDownloadButton from 'components/molecules/JSONDownLoadButton'
import storageTankJSON from 'assets/storage.tank.json'
import * as ethers from 'ethers'
import { testingPath, testingSetup } from './testingPaths'

// @ts-ignore
window.ethers = ethers

const createNewAccount = async () => {
  const randomWallet = ethers.Wallet.createRandom()
  console.log(randomWallet)
  return randomWallet
}

export const ManualTestGateway: FC = () => {
  const { sdk, connected: isMetamaskConnected } = useSDK()
  const [createdAccount, setCreatedAccount] = useState(false)
  const isMetamaskInstalled = sdk?.getProvider() === window.ethereum

  const [wallet, setWallet] = useState<ethers.HDNodeWallet>(
    {} as ethers.HDNodeWallet
  )

  return (
    <div>
      <Paragraph>
        {isMetamaskInstalled ? (
          <>
            <CheckmarkIcon className="mr-4 text-green-400" />
            Metamask is installed
          </>
        ) : (
          <div>
            <XIcon className="mr-4 text-red-400" /> Metamask is not installed
          </div>
        )}
      </Paragraph>
      <Paragraph>
        {isMetamaskConnected ? (
          <>
            <CheckmarkIcon className="mr-4 text-green-400" />
            Metamask is connected
          </>
        ) : (
          <>
            <XIcon className="mr-4 text-red-400" />{' '}
            <Button
              onClick={() => {
                sdk?.connect()
                console.log('dupa')
              }}
            >
              Connect to metamask
            </Button>
          </>
        )}
      </Paragraph>
      <Paragraph>
        <>
          <JSONDownloadButton jsonData={storageTankJSON} />
          <div className="ml-4">
            {' '}
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
        <Paragraph style={{ display: 'block' }} className="pt-2">
          <div className="font-bold"> Created new account </div>
          <div>
            <b>wallet.address:</b> {wallet.address}
          </div>
          <div>
            <b>wallet.privateKey:</b> {wallet.privateKey}
          </div>
          <div>
            {' '}
            Import by private key instrucions you can find{' '}
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

      {createdAccount && (
        <Paragraph>
          <Select
            className="mr-10"
            onChange={(e) => {
              //TODO fix this @tsingore usage
              //@ts-ignore
              console.log('changed', e.target.value)
            }}
          >
            <option className="text-opacity-50">choose </option>

            {(
              Object.keys(testingSetup) as Array<keyof typeof testingSetup>
            ).map((testingPathKey) => {
              const testingPath = testingSetup[testingPathKey]
              return (
                <option key={testingPathKey} value={testingPathKey}>
                  {testingPath.label}
                </option>
              )
            })}
          </Select>
          Choose testing path. This will automatically set proper account
          balance on the newly created account
        </Paragraph>
      )}
    </div>
  )
}
