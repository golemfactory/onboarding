import { Step, StepType } from 'state/steps'
import { EthereumAddress, assertEthereumAddress } from './ethereum'
import { BalanceCase, BalanceCaseType } from './path'

export function assertBalanceCaseType(
  x: unknown
): asserts x is BalanceCaseType {
  if (!Object.values(BalanceCase).find((v) => v === x)) {
    throw new Error(`Invalid balance case type ${x}`)
  }
}

export function assertStep(x: unknown): asserts x is StepType {
  if (!Object.values(Step).find((v) => v === x)) {
    throw new Error(`Invalid step ${x}`)
  }
}

export function assertStepsArray(x: unknown): asserts x is StepType[] {
  if (!Array.isArray(x)) {
    throw new Error('Invalid steps array')
  }
  x.forEach((step) => assertStep(step))
}

type SetupContextData = {
  yagnaAddress?: EthereumAddress
  balanceCase?: BalanceCaseType
  skipSteps?: StepType[]
}

export function assertProperSetup(
  x: Record<string, unknown>
): asserts x is SetupContextData {
  const keys = Object.keys(x)

  if (keys.length > 3) {
    throw new Error('Invalid setup context data')
  }

  const invalidKey = keys.find(
    (key) =>
      key !== 'yagnaAddress' && key !== 'balanceCase' && key !== 'skipSteps'
  )

  if (invalidKey) {
    throw new Error(`invalid key ${invalidKey} in setup context data`)
  }

  assertEthereumAddress(x.yagnaAddress)
  assertBalanceCaseType(x.balanceCase)
  assertStepsArray(x.skipSteps)
}
