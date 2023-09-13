import { Paragraph, Button, HyperLink, Select } from 'components/atoms'
import { FC, useState } from 'react'
import { useSDK } from '@metamask/sdk-react'
import { CheckmarkIcon, XIcon } from 'components/atoms/icons'
import JSONDownloadButton from 'components/molecules/JSONDownLoadButton'
import storageTankJSON from 'assets/storage.tank.json'
import * as ethers from 'ethers'
import { testingPath, testingSetup } from './testingPaths'
import { assertEthereumAddress } from 'types/ethereum'
import { transferInitialBalances } from './transfer'

const createNewAccount = async () => {
  const randomWallet = ethers.Wallet.createRandom()
  return randomWallet
}

export const ManualTestGateway: FC = () => {
  const { sdk, connected: isMetamaskConnected, account } = useSDK()
  const [showModal, setShowModal] = useState(false)

  const [createdAccount, setCreatedAccount] = useState(false)

  const isMetamaskInstalled =
    !!window.ethereum && sdk?.getProvider() === window.ethereum

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
            <Button
              onClick={() => {
                sdk?.connect()
              }}
            >
              Install metamask
            </Button>
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
        <Paragraph>
          <Select
            className="mr-10"
            onChange={async (e) => {
              const path = e.currentTarget.value
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                //@ts-ignore
                params: [{ chainId: `0x${CHAIN_ID.toString(16)}` }],
              })
              if (account !== `0x${storageTankJSON.address}`) {
                setShowModal(true)
              } else {
                assertEthereumAddress(wallet.address)

                await transferInitialBalances({
                  testingPath: path as testingPath,
                  address: wallet.address,
                  signer: await new ethers.BrowserProvider(
                    window.ethereum
                  ).getSigner(account),
                })

                window.location.hash = '#/'
              }

              //TODO: display some nice notifications here
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

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Wrong account</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    Please make sure you are using proper tank account:
                    <br></br>
                    <br></br>
                    <b> 0x923e80e15ce84e753a5ae954aa49dc50f5f12022 </b>
                    <br></br>
                    <br></br>
                    Now you are using:
                    <br></br>
                    <br></br>
                    <b> {account} </b>
                    <br></br>
                    <br></br>
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  )
}
