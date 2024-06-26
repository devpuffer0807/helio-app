import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { ReactComponent as CrossIcon } from 'assets/icon-cross.svg';
import {
  SAFE_BORROW_LIMIT_PERCENTS,
  truncateNumber,
  useGetBorrowUtilization,
  Warning,
  ZERO,
} from 'modules/common';
import { useCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import { Layout } from 'modules/layout';
import { useSubscriptionGetLiquidatedQuery } from 'modules/subscription/actions';

import { rgba } from '../../../theme';
import { useGetPendingWithdrawalQuery } from '../../actions';
import { BorrowStats } from './components/BorrowStats';
import { CollateralList } from './components/CollateralList';

export function Dashboard(): JSX.Element {
  const { data: liquidated } = useSubscriptionGetLiquidatedQuery();
  const [{ token }] = useCollateralToken();
  const borrowingUtilization = useGetBorrowUtilization(token);
  const [{ unit }] = useCollateralToken();
  const [isWarningVisible, setWarningVisible] = useState(false);
  const { data: pendingWithdrawal } = useGetPendingWithdrawalQuery();

  const { amount: pendingAmount, fulfillmentDate } = pendingWithdrawal ?? {};

  useEffect(() => {
    if (
      liquidated?.liquidationCost.isGreaterThan(ZERO) ||
      borrowingUtilization.isGreaterThan(SAFE_BORROW_LIMIT_PERCENTS)
    ) {
      setWarningVisible(true);
    }
  }, [liquidated, borrowingUtilization]);

  const warningMessage = liquidated?.ts
    ? t('warning.liquidated', {
        unit,
        value: truncateNumber(liquidated.liquidationCost, 2),
        date: new Date(liquidated.ts * 1000),
      })
    : t('warning.above-threshold');

  const { classes } = useStyles();

  return (
    <Layout>
      {isWarningVisible && (
        <Box className={classes.warningBlock}>
          <Box className={classes.warningLabel} />
          <Warning variant="body2" className={classes.warning}>
            {warningMessage}
          </Warning>
          <CrossIcon
            className={classes.warningCross}
            onClick={() => setWarningVisible(false)}
          />
        </Box>
      )}

      <Box
        component={BorrowStats}
        sx={{
          marginBottom: { xs: '40px', md: '58px' },
        }}
      />

      <div className={classes.titleWrapper}>
        <Typography
          variant="h2"
          sx={{
            fontSize: 24,
          }}
        >
          {t('borrow.dashboard.table-title')}
        </Typography>
        {pendingAmount && fulfillmentDate && (
          <Typography variant="subtitle1" className={classes.pendingWithdrawal}>
            {t(
              'borrow.dashboard.pendingWithdrawals',
              {
                value: pendingAmount,
                token: t('units.COLLATERAL_MAIN_TOKEN'),
              },
              true,
            )}
            <div className={classes.pendingWithdrawalInfo}>
              <Typography variant="subtitle1" fontWeight={500}>
                {t('borrow.dashboard.released-no-later-than')}
              </Typography>
              <Typography variant="subtitle1" fontWeight={500} color="#787878">
                {t('borrow.dashboard.release-date', { date: fulfillmentDate })}
              </Typography>
            </div>
          </Typography>
        )}
      </div>

      <CollateralList />
    </Layout>
  );
}

const useStyles = makeStyles()(theme => ({
  warningBlock: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
    borderRadius: '12px',
    marginBottom: '12px',
    padding: '21px',
  },
  warningLabel: {
    backgroundColor: theme.colors.red,
    width: '4px',
    height: '40px',
    borderRadius: '2px',
    marginRight: '10px',
  },
  warning: {
    borderColor: theme.colors.white,
    padding: 0,
  },
  warningCross: {
    cursor: 'pointer',
    marginLeft: 20,
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '26px',

    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
      flexFlow: 'column nowrap',
      alignItems: 'unset',
      justifyContent: 'unset',
    },
  },
  pendingWithdrawal: {
    '&&': {
      position: 'relative',
      color: rgba(theme.colors.black, 0.5),
      cursor: 'pointer',
    },

    '&:hover div': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  pendingWithdrawalInfo: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    transform: 'translateY(calc(100% + 12px))',
    padding: '14px 16px',
    background: theme.colors.white,
    display: 'flex',
    flexFlow: 'column nowrap',
    gap: '6px',
    borderRadius: '12px',
    boxShadow:
      '0px 0px 1px rgba(0, 0, 0, 0.26), 0px 3px 8px rgba(0, 0, 0, 0.06)',
    visibility: 'hidden',
    opacity: 0,
    transition: 'all .2s ease',

    [theme.breakpoints.down('sm')]: {
      right: 'unset',
      left: '0',
    },
  },
}));
