import { ReactNode } from 'react'
import { WagmiConfig, createConfig } from 'wagmi'
import { createPublicClient, custom } from 'viem'
import { polygon, polygonMumbai, mainnet } from 'wagmi/chains'
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'

//@ts-ignore
import { mock } from '@depay/web3-mock'

//...

console.log('co kurwa', createConfig)

mock({
  blockchain: 'ethereum',
  accounts: ['0xb0252f13850a4823706607524de0b146820F2240'],
  balance: {
    for: '0xb0252f13850a4823706607524de0b146820F2240',
    return: '232111122321',
  },
})

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: custom(window.ethereum),
  }),
})

const projectId = '20bd2ed396d80502980b6d2a3fb425f4'

const metadata = {
  name: 'Golem',
  description: 'Onboarding to Golem Network',
  url: 'https://web3modal.com',
  icons: ['/logo.svg'],
}

const chains = [polygon, polygonMumbai, mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'light',
})

export const BlockchainProvider = ({ children }: { children: ReactNode }) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>
}
