import { generatePath, Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Repay } from './screens';

const PATH = `/repay/`;

export const RepayRoutesConfig = createRouteConfig(
  {
    repay: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getRepayRoutes(): JSX.Element {
  return (
    <Route
      path={RepayRoutesConfig.repay.generatePath()}
      element={
        <GuardRoute>
          <Repay />
        </GuardRoute>
      }
    />
  );
}
