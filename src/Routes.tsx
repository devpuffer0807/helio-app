import { Navigate, Route, Routes as Switch } from 'react-router-dom';

import { t } from 'modules/i18n';

import { getAnalyticsRoutes } from './modules/analytics';
import { getBorrowRoutes } from './modules/borrow';
import { getCollateralRoutes } from './modules/collateral';
import { IS_ANALYTICS_ENABLED } from './modules/common';
import { getEarnRoutes } from './modules/earn';
import { getLiquidationRoutes } from './modules/liquidation';
import { getDashboardRoutes } from './modules/my-positions';
import { getRepayRoutes } from './modules/repay';
import { getSubscriptionRoutes } from './modules/subscription';
import { getWithdrawCollateralRoutes } from './modules/withdraw';
import { RootRoute } from './RootRoute';

export function Routes(): JSX.Element {
  return (
    <Switch>
      <Route path="/" element={<RootRoute />}>
        <Route path="/" element={<Navigate to="dashboard" replace />} />

        {getDashboardRoutes()}

        {IS_ANALYTICS_ENABLED && getAnalyticsRoutes()}

        {getBorrowRoutes()}

        {getCollateralRoutes()}

        {getRepayRoutes()}

        {getSubscriptionRoutes()}

        {getWithdrawCollateralRoutes()}

        {getLiquidationRoutes()}

        {getEarnRoutes()}

        <Route>{t('routes.page-not-found')}</Route>
      </Route>
    </Switch>
  );
}
