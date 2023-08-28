import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'

type RampParams = ConstructorParameters<typeof RampInstantSDK>

export const useRamp = (rampParams: RampParams) => {
  const instance = new RampInstantSDK(...rampParams)
  return instance
}
