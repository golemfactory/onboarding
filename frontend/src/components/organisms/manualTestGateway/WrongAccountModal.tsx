import { Modal } from 'components/molecules/modal'
import { FC, useState } from 'react'
import { EthereumAddress } from 'types/ethereum'

const WrongAccountModalBody: FC<{ account: EthereumAddress }> = ({
  account,
}) => {
  return (
    <div className="relative p-6 flex-auto">
      <p className="my-4 text-slate-500 text-lg leading-relaxed">
        Please make sure you are using proper tank account:
        <br></br>
        <br></br>
        {/* move tank account to env  */}
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
  )
}

export const WrongAccountModal: FC<{
  account: EthereumAddress
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}> = ({ account, showModal, setShowModal }) => {
  return (
    <Modal
      className={''}
      toggleVisibility={setShowModal}
      isVisible={showModal}
      title="Wrong account"
    >
      <WrongAccountModalBody account={account} />
    </Modal>
  )
}
