//TODO make sure to refactor when we start supporting more wallets

import { CheckCircleIcon } from '@heroicons/react/24/solid'

export const WalletIconGreen = () => {
  const wallet = 'metamask'
  const background = wallet === 'metamask' ? 'metamask-icon.svg' : 'trust.png'
  return (
    <div
      style={{
        width: '140px',
        height: '140px',
        backgroundImage: `url(${background})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
      className="absolute -bottom-10 -right-10"
    >
      <CheckCircleIcon className="h-12 absolute bottom-0 right-0 text-success-100" />
    </div>
  )
}
