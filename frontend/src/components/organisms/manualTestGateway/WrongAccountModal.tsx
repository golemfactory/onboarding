import { Modal } from 'components/molecules/modal/modal'
import { EthereumAddress } from 'types/ethereum'

const WrongAccountModalBody = ({
  currentAccount,
  expectedAccount,
}: {
  currentAccount: EthereumAddress
  expectedAccount: EthereumAddress
}) => {
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
        So we cant proceed. This has to be done manually due to metamask design.
      </p>
    </div>
  )
}

export const WrongAccountModal = ({
  showModal,
  setShowModal,
  currentAccount,
  expectedAccount,
}: {
  showModal: boolean
  setShowModal: (show: boolean) => void
  currentAccount: EthereumAddress
  expectedAccount: EthereumAddress
}) => {
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
