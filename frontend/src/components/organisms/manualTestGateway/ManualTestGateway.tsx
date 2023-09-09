import { Paragraph, Button } from 'components/atoms'
import { FC, useState } from 'react'
import { useSDK } from '@metamask/sdk-react'
import { CheckmarkIcon, XIcon } from 'components/atoms/icons'
import JSONDownloadButton from 'components/molecules/JSONDownLoadButton'
import storageTankJSON from 'assets/storage.tank.json'
import * as ethers from 'ethers'

// @ts-ignore
window.ethers = ethers

const createNewAccount = async () => {
  const randomWallet = ethers.Wallet.createRandom()
  console.log(randomWallet)
  return randomWallet
}

export const ManualTestGateway: FC = () => {
  const { sdk, connected: isMetamaskConnected } = useSDK()
  const [downloaded, setDownloaded] = useState(false)
  const [createdAccount, setCreatedAccount] = useState(false)
  const isMetamaskInstalled = sdk?.getProvider() === window.ethereum

  const [wallet, setWallet] = useState<ethers.HDNodeWallet>(
    {} as ethers.HDNodeWallet
  )

  return (
    <div>
      <Paragraph>
        {isMetamaskInstalled ? (
          <div>
            <CheckmarkIcon className="mr-4 text-green-400" />
            Metamask is installed
          </div>
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
        {downloaded ? (
          <>
            <CheckmarkIcon className="mr-4 text-green-400" />
            Data downloaded
          </>
        ) : (
          <>
            <XIcon className="mr-4 text-red-400" />
            <JSONDownloadButton
              jsonData={storageTankJSON}
              onClick={() => {
                setDownloaded(true)
              }}
            />
          </>
        )}
      </Paragraph>
      <Paragraph style={{ display: 'block', padding: '10px' }}>
        <div className="font-bold"> Created new account </div>
        {createdAccount && (
          <>
            <div>
              <b>wallet.address:</b> {wallet.address}
            </div>
            <div>
              <b>wallet.privateKey:</b> {wallet.privateKey}
            </div>
          </>
        )}
        {!createdAccount && (
          <Button
            onClick={async () => {
              setWallet(await createNewAccount())
              setCreatedAccount(true)
            }}
          ></Button>
        )}
      </Paragraph>
    </div>
  )
}
