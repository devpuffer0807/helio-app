import { generatePath, Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Liquidation } from './screens';

const PATH = `/liquidation/`;

export const LiquidationRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getLiquidationRoutes(): JSX.Element {
  return (
    <Route
      path={LiquidationRoutesConfig.dashboard.generatePath()}
      element={
        <GuardRoute>
          <Liquidation />
        </GuardRoute>
      }
    />
  );
}
