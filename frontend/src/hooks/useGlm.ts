import { useNetwork } from './useNetwork'
import { useEffect, useState } from 'react'
import { IUtilityToken } from 'types/ethereum'
import { getGLMToken } from 'utils/getGLMToken'

export const useGlm = () => {
  const { chain } = useNetwork()
  if (!chain) throw new Error('No chain')
  const [glm, setGlm] = useState<IUtilityToken>(getGLMToken(chain.id))

  useEffect(() => {
    setGlm(getGLMToken(chain.id))
  }, [chain.id])
  return glm
}
