import { generatePath, Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';
import { Layout } from 'modules/layout';

import { SubscriptionForm } from './screens';

const PATH = '/subscription/';

export const SubscriptionRoutesConfig = createRouteConfig(
  {
    subscription: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getSubscriptionRoutes(): JSX.Element {
  return (
    <Route
      path={SubscriptionRoutesConfig.root}
      element={
        <GuardRoute>
          <Layout>
            <SubscriptionForm />
          </Layout>
        </GuardRoute>
      }
    />
  );
}
