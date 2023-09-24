// components/welcome/intro.tsx
import { motion } from 'framer-motion'
import { MouseEventHandler } from 'react'
import { getGLMToken } from 'utils/getGLMToken'

export const AddGLM = ({ goToNextStep }: { goToNextStep: () => {} }) => {
  const addGLM = async () => {
    const { address, decimals, symbol } = await getGLMToken()

    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: { type: 'ERC20', options: { address, decimals, symbol } },
    })

    goToNextStep()
  }

  return <AddGLMPresentational onConfirm={addGLM} />
}
