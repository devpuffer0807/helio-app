import { generatePath, Route } from 'react-router-dom';

import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Dashboard } from './screens';

const PATH = `/analytics/`;

export const AnalyticsRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getAnalyticsRoutes(): JSX.Element {
  return (
    <Route
      path={AnalyticsRoutesConfig.dashboard.generatePath()}
      element={<Dashboard />}
    />
  );
}
