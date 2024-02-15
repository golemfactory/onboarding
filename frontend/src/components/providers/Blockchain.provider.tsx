import { polygon, polygonMumbai, mainnet } from 'wagmi/chains'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Prop } from 'xstate'
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
})

export function BlockchainProvider({ children }: PropsWithChildren) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
