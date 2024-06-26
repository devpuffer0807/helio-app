import { generatePath, Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Dashboard } from './screens';

const PATH = `/dashboard/`;

export const DashboardRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getDashboardRoutes(): JSX.Element {
  return (
    <Route
      path={DashboardRoutesConfig.dashboard.generatePath()}
      element={
        <GuardRoute>
          <Dashboard />
        </GuardRoute>
      }
    />
  );
}
