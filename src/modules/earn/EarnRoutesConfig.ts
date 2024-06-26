import { generatePath } from 'react-router-dom';

import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { withQueryParams } from './hooks/withQueryParams';

const PATH = `/earn`;
const BOOSTED_VAULTS_STAKE_PATH = `${PATH}/boosted-vaults/stake`;
const BOOSTED_VAULTS_UNSTAKE_PATH = `${PATH}/boosted-vaults/unstake`;
const STAKE_PATH = `${PATH}/stake`;
const UNSTAKE_PATH = `${PATH}/unstake`;

export const EarnRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
    boostedVaultsStake: {
      path: BOOSTED_VAULTS_STAKE_PATH,
      generatePath: (tokens: string[], type?: string) =>
        withQueryParams(
          generatePath(BOOSTED_VAULTS_STAKE_PATH),
          'token',
          tokens,
          type,
        ),
    },
    boostedVaultsUnstake: {
      path: BOOSTED_VAULTS_UNSTAKE_PATH,
      generatePath: (tokens: string[], type?: string) =>
        withQueryParams(
          generatePath(BOOSTED_VAULTS_UNSTAKE_PATH),
          'token',
          tokens,
          type,
        ),
    },
    stakingStake: {
      path: STAKE_PATH,
      generatePath: (token: string) =>
        withQueryParams(generatePath(STAKE_PATH), 'token', token),
    },
    stakingUnstake: {
      path: UNSTAKE_PATH,
      generatePath: (token: string) =>
        withQueryParams(generatePath(UNSTAKE_PATH), 'token', token),
    },
  },
  PATH,
);
