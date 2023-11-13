import { useState } from 'react'
import type { SignTypedDataArgs } from '@wagmi/core'

export const useTypedData = function () {
  return useState<{ eip712: SignTypedDataArgs }>({
    eip712: {
      domain: {},
      types: {},
      message: {},
      primaryType: '',
    },
  })
}
