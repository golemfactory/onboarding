import { Network } from 'types/ethereum'

import { BalanceCase } from 'types/path'

type TestingSetupType = {
  glmBalance: number
  maticBalance: number
  label: string
}

export const testingSetup: Record<BalanceCase, TestingSetupType> = {
  [BalanceCase.NO_GLM]: {
    glmBalance: 0,
    maticBalance: 15,
    label: 'No GLM',
  },
  [BalanceCase.NO_MATIC]: {
    glmBalance: 1000,
    maticBalance: 0,
    label: 'No MATIC',
  },
  [BalanceCase.BOTH]: {
    glmBalance: 1000,
    maticBalance: 15,
    label: 'Both GLM and MATIC',
  },
  [BalanceCase.NO_GLM_NO_MATIC]: {
    glmBalance: 0,
    maticBalance: 0,
    label: 'No GLM and no MATIC',
  },
}

export const getExpectedBalances = ({
  network = Network.POLYGON,
  testingPath,
}: {
  network?: Network
  testingPath: BalanceCase
}) => {
  const { glmBalance, maticBalance } = testingSetup[testingPath]
  return {
    glm: glmBalance,
    native: maticBalance,
  }
}
