import { Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { EarnRoutesConfig } from 'modules/earn/EarnRoutesConfig';

import { GuardStakingToken } from './components/GuardStakingToken';
import { GuardVaultRoute } from './components/GuardVaultRoute';
import { BoostedVaultStake } from './screens/BoostedVaultStake';
import { BoostedVaultUnstake } from './screens/BoostedVaultUnstake';
import { Earn } from './screens/Earn';
import { StakingStake } from './screens/StakingStake';
import { StakingUnstake } from './screens/StakingUnstake';

export function getEarnRoutes(): JSX.Element {
  return (
    <>
      <Route
        path={EarnRoutesConfig.dashboard.path}
        element={
          <GuardRoute>
            <Earn />
          </GuardRoute>
        }
      />

      <Route
        path={EarnRoutesConfig.boostedVaultsStake.path}
        element={
          <GuardRoute>
            <GuardVaultRoute>
              <BoostedVaultStake />
            </GuardVaultRoute>
          </GuardRoute>
        }
      />

      <Route
        path={EarnRoutesConfig.boostedVaultsUnstake.path}
        element={
          <GuardRoute>
            <GuardVaultRoute>
              <BoostedVaultUnstake />
            </GuardVaultRoute>
          </GuardRoute>
        }
      />

      <Route
        path={EarnRoutesConfig.stakingStake.path}
        element={
          <GuardRoute>
            <GuardStakingToken>
              <StakingStake />
            </GuardStakingToken>
          </GuardRoute>
        }
      />

      <Route
        path={EarnRoutesConfig.stakingUnstake.path}
        element={
          <GuardRoute>
            <GuardStakingToken>
              <StakingUnstake />
            </GuardStakingToken>
          </GuardRoute>
        }
      />
    </>
  );
}
