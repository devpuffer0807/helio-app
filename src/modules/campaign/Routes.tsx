import { generatePath, Route } from 'react-router-dom';

import { createRouteConfig } from 'modules/common/utils/createRouteConfig';
import { Layout } from 'modules/layout';

import { CampaignForm } from './screens';

const PATH = '/campaign/';

export const CampaignRoutesConfig = createRouteConfig(
  {
    campaign: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
  },
  PATH,
);

export function getCampaignRoutes(): JSX.Element {
  return (
    <Route
      path={CampaignRoutesConfig.root}
      element={
        <Layout>
          <CampaignForm />
        </Layout>
      }
    />
  );
}
