import { Paragraph, Button } from 'components/atoms'
import { FC, useState } from 'react'
import { useSDK } from '@metamask/sdk-react'
import { CheckmarkIcon, XIcon } from 'components/atoms/icons'
import JSONDownloadButton from 'components/molecules/JSONDownLoadButton'
import storageTankJSON from 'assets/storage.tank.json'

export const ManualTestGateway: FC = () => {
  const { sdk, connected: isMetamaskConnected } = useSDK()
  const [downloaded, setDownloaded] = useState(false)
  const isMetamaskInstalled = sdk?.getProvider() === window.ethereum
  return (
    <div>
      <Paragraph>
        {isMetamaskInstalled ? (
          <div>
            <CheckmarkIcon />
            Metamask is installed
          </div>
        ) : (
          <div>
            <XIcon />
            Metamask is not installed
          </div>
        )}
      </Paragraph>
      <Paragraph>
        {isMetamaskConnected ? (
          <div>
            <CheckmarkIcon />
            Metamask is connected
          </div>
        ) : (
          <div>
            <XIcon />
            <Button onClick={sdk?.connect}>Connect to metamask</Button>
          </div>
        )}
      </Paragraph>
      <Paragraph>
        {downloaded ? (
          <div>
            <CheckmarkIcon />
            Data downloaded
          </div>
        ) : (
          <div>
            <XIcon />
            <JSONDownloadButton
              jsonData={storageTankJSON}
              onClick={() => {
                setDownloaded(true)
              }}
            />
          </div>
        )}
      </Paragraph>
      <Paragraph></Paragraph>
    </div>
  )
}
