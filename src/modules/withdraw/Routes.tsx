import { generatePath, Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Withdrawal } from './screens';

const PATH = `/withdraw/`;

export const WithdrawCollateralRoutesConfig = createRouteConfig(
  {
    provide: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getWithdrawCollateralRoutes(): JSX.Element {
  return (
    <Route
      path={WithdrawCollateralRoutesConfig.root}
      element={
        <GuardRoute>
          <Withdrawal />
        </GuardRoute>
      }
    />
  );
}
