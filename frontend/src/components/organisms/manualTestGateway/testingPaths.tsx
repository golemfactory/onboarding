import { Network } from 'ethereum/networks'

export enum testingPath {
  NO_ACCOUNT = 'no-account',
  NO_GLM = 'no-glm',
  NO_MATIC = 'no-matic',
  BOTH = 'both',
  NO_GLM_NO_MATIC = 'no-glm-no-matic',
}

type testingSetupType = {
  glmBalance: number
  maticBalance: number
  label: string
}

export const testingSetup: Record<testingPath, testingSetupType> = {
  [testingPath.NO_ACCOUNT]: {
    glmBalance: 0,
    maticBalance: 0,
    label: 'No account',
  },
  [testingPath.NO_GLM]: {
    glmBalance: 0,
    maticBalance: 15,
    label: 'No GLM',
  },
  [testingPath.NO_MATIC]: {
    glmBalance: 1000,
    maticBalance: 0,
    label: 'No MATIC',
  },
  [testingPath.BOTH]: {
    glmBalance: 1000,
    maticBalance: 15,
    label: 'Both GLM and MATIC',
  },
  [testingPath.NO_GLM_NO_MATIC]: {
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
  testingPath: testingPath
}) => {
  const { glmBalance, maticBalance } = testingSetup[testingPath]
  return {
    glm: glmBalance,
    native: maticBalance,
  }
}
