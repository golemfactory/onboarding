import Hotjar from '@hotjar/browser'

import { useCallback, useState } from 'react'

type UserInfoType = Record<string | number, string | number | Date | boolean>

type InitParams = {
  id: number
  version: number
  options: { debug?: boolean }
}

type IdentifyParams = {
  id: string
  userInfo: UserInfoType
}

type StateChangeParams = {
  relativePath: string
}

type UseHotjarReturnType = {
  isReady: boolean
  init: (params: InitParams) => boolean
  identify: (params: IdentifyParams) => boolean
  stateChange: (params: StateChangeParams) => boolean
}

export default function useHotjar(): UseHotjarReturnType {
  const [isReady, setIsReady] = useState(Hotjar.isReady())

  const init = useCallback(({ id, version, options }: InitParams): boolean => {
    try {
      Hotjar.init(id, version, options)
      setIsReady(true)
      return true
    } catch (error) {
      return false
    }
  }, [])

  const identify = useCallback(({ id, userInfo }: IdentifyParams): boolean => {
    try {
      Hotjar.identify(id, userInfo)
      return true
    } catch (error) {
      return false
    }
  }, [])

  const stateChange = useCallback(
    ({ relativePath }: StateChangeParams): boolean => {
      try {
        Hotjar.stateChange(relativePath)
        return true
      } catch (error) {
        return false
      }
    },
    []
  )

  return {
    init,
    isReady,
    identify,
    stateChange,
  }
}
