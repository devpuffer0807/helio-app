import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from 'tss-react/mui';

import { Tooltip, truncateNumber, useNetBorrowAPR, ZERO } from 'modules/common';
import { useCollateralToken } from 'modules/core';
import { t } from 'modules/i18n';
import { useGetBorrowAPRQuery } from 'modules/store/actions/getBorrowAPR';
import { useGetRewardsAPRQuery } from 'modules/store/actions/getRewardsAPR';
import { rgba } from 'modules/theme';

export function Rewards(): JSX.Element {
  const { classes } = useStyles();
  const [{ token }] = useCollateralToken();
  const netBorrowAPR = useNetBorrowAPR(token);
  const { data: fetchedBorrowAPR } = useGetBorrowAPRQuery({ token });
  const { data: rewardsAPR } = useGetRewardsAPRQuery({ token });

  return (
    <Paper className={classes.root}>
      <Box className={classes.aprBlock}>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" mr={0.5}>
            {t('borrow.dashboard.net-borrowing-apr')}
          </Typography>
          <Tooltip title={t('borrow.dashboard.net-borrowing-apr-tooltip')} />
        </Box>
        <Box display="flex" flexDirection="row" alignItems="flex-end">
          <Typography variant="h1">
            {truncateNumber(netBorrowAPR, 2)}
          </Typography>
          <Typography variant="h4" lineHeight="30px" fontWeight={500}>
            &nbsp;%
          </Typography>
        </Box>
      </Box>
      <Box className={classes.restStats}>
        <div className={classes.restStatsInner}>
          <Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" sx={{ mr: 0.5, opacity: 0.5 }}>
                {t('borrow.dashboard.token-rewards')}
              </Typography>
              <Tooltip title={t('borrow.dashboard.rewards-tooltip')} />
            </Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <Typography variant="h1" fontSize="16px" fontWeight={600}>
                {truncateNumber(rewardsAPR ?? ZERO, 2)}
              </Typography>
              <Typography
                variant="h4"
                fontSize="16px"
                fontWeight={600}
                ml="3px"
              >
                %
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" sx={{ mr: 0.5, opacity: 0.5 }}>
                {t('borrow.dashboard.borrowing-apr')}
              </Typography>
              <Tooltip title={t('borrow.dashboard.borrowing-apr-tooltip')} />
            </Box>
            <Box display="flex" flexDirection="row" mt={1}>
              <Typography variant="h1" fontSize="16px" fontWeight={600}>
                {truncateNumber(fetchedBorrowAPR ?? ZERO, 2)}
              </Typography>
              <Typography
                variant="h4"
                fontSize="16px"
                fontWeight={600}
                ml="3px"
              >
                %
              </Typography>
            </Box>
          </Box>
        </div>
      </Box>
    </Paper>
  );
}

const useStyles = makeStyles()(theme => ({
  root: {
    padding: '28px 28px 22px',
    whiteSpace: 'nowrap',
    display: 'flex',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      flexFlow: 'row nowrap',
    },

    [theme.breakpoints.down('sm')]: {
      flexFlow: 'column nowrap',
      padding: '24px 16px',
    },
  },
  aprBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      minWidth: '50%',
    },

    [theme.breakpoints.down('sm')]: {
      borderRight: 'unset',
      borderBottom: `1px solid ${rgba(theme.colors.black, 0.1) ?? ''}`,
      paddingBottom: '24px',
      flex: 1,
      marginBottom: '24px',
    },
  },
  restStats: {
    flex: 1,
    justifyContent: 'center',
  },
  restStatsInner: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.up('sm')]: {
      paddingLeft: '28px',
      borderLeft: `1px solid ${rgba(theme.colors.black, 0.1) ?? ''}`,
    },

    [theme.breakpoints.down('sm')]: {
      gap: 20,
    },
  },
}));
