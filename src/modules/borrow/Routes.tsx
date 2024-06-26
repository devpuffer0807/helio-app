import { generatePath, Route } from 'react-router-dom';

import { GuardRoute } from 'modules/auth';
import { createRouteConfig } from 'modules/common/utils/createRouteConfig';

import { Borrow, Dashboard } from './screens';

const PATH = `/loans/`;
const BORROW_PATH = `/borrow/`;

export const BorrowRoutesConfig = createRouteConfig(
  {
    dashboard: {
      path: PATH,
      generatePath: () => generatePath(PATH),
    },
    borrow: {
      path: BORROW_PATH,
      generatePath: () => generatePath(BORROW_PATH),
    },
  },
  PATH,
);

export function getBorrowRoutes(): JSX.Element {
  return (
    <>
      {/* TODO: Put dashboard route into dashboard module */}
      <Route
        path={BorrowRoutesConfig.root}
        element={
          <GuardRoute>
            <Dashboard />
          </GuardRoute>
        }
      />
      <Route
        path={BorrowRoutesConfig.borrow.generatePath()}
        element={
          <GuardRoute>
            <Borrow />
          </GuardRoute>
        }
      />
    </>
  );
}
