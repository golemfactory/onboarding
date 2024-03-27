import { polygon, polygonMumbai, mainnet } from 'wagmi/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
const projectId = '20bd2ed396d80502980b6d2a3fb425f4'

const metadata = {
  name: 'Golem',
  description: 'Onboarding to Golem Network',
  url: 'https://web3modal.com',
  icons: ['/logo.svg'],
}

const chains = [polygon, polygonMumbai, mainnet] as const

const queryClient = new QueryClient()

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  featuredWalletIds: [
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  ],
  themeMode: 'light',
})

export function BlockchainProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
