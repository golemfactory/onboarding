import { Modal } from 'components/molecules/modal'
import { FC, useState } from 'react'
import { EthereumAddress } from 'types/ethereum'

const WrongAccountModalBody: FC<{
  currentAccount: EthereumAddress
  expectedAccount: EthereumAddress
}> = ({ currentAccount, expectedAccount }) => {
  return (
    <div className="relative p-6 flex-auto">
      <p className="my-4 text-slate-500 text-lg leading-relaxed">
        Please make sure selected account is:
        <br></br>
        <br></br>
        {/* move tank account to env  */}
        <b>{expectedAccount}</b>
        <br></br>
        <br></br>
        Currently you use:
        <br></br>
        <br></br>
        <b> {currentAccount} </b>
        <br></br>
        <br></br>
        So we can't proceed. This has to be done manually due to metamask
        design.
      </p>
    </div>
  )
}

export const WrongAccountModal: FC<{
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  currentAccount: EthereumAddress
  expectedAccount: EthereumAddress
}> = ({ showModal, setShowModal, currentAccount, expectedAccount }) => {
  return (
    <Modal
      className={''}
      toggleVisibility={setShowModal}
      isVisible={showModal}
      title="Wrong account"
    >
      <WrongAccountModalBody
        currentAccount={currentAccount}
        expectedAccount={expectedAccount}
      />
    </Modal>
  )
}
