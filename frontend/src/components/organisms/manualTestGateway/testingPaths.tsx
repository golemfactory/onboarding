import { BalanceCaseType, BalanceCase } from 'types/path'

type TestingSetupType = {
  glmBalance: number
  polBalance: number
  label: string
}

export const testingSetup: Record<BalanceCaseType, TestingSetupType> = {
  [BalanceCase.NO_GLM]: {
    glmBalance: 0,
    polBalance: 15,
    label: 'No GLM',
  },
  [BalanceCase.NO_POL]: {
    glmBalance: 1000,
    polBalance: 0,
    label: 'No POL',
  },
  [BalanceCase.BOTH]: {
    glmBalance: 1000,
    polBalance: 15,
    label: 'Both GLM and POL',
  },
  [BalanceCase.NO_GLM_NO_POL]: {
    glmBalance: 0,
    polBalance: 0,
    label: 'No GLM and no POL',
  },
}

export const getExpectedBalances = ({
  testingPath,
}: {
  testingPath: BalanceCaseType
}) => {
  const { glmBalance, polBalance } = testingSetup[testingPath]
  return {
    glm: glmBalance,
    native: polBalance,
  }
}
