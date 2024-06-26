import { generatePath, Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Provide } from './screens';

const PATH = `/provide/`;

export const CollateralRoutesConfig = createRouteConfig(
  {
    provide: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getCollateralRoutes(): JSX.Element {
  return (
    <Route
      path={CollateralRoutesConfig.root}
      element={
        <GuardRoute>
          <Provide />
        </GuardRoute>
      }
    />
  );
}
